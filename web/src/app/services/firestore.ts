import { Injectable } from '@angular/core';
import { AngularFirestore, Action, DocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, from, EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, tap, filter } from 'rxjs/operators';
import { ProgressService } from './progress';
import { Lodge } from '../domain/lodge';
import { User } from '../domain/user';
import { EventHandle } from '../domain/event';
import { AuthService } from './auth';
import { Attendance } from '../domain/attendance';
import { AttendanceReport } from '../domain/report';
import { firestore } from 'firebase';

@Injectable()
export class FirestoreService {
    constructor(
        private db: AngularFirestore,
        private auth: AuthService,
        private progress: ProgressService
    ) { }

    private snapshotMapDoc = <T>(c: Action<DocumentSnapshot<T>>) => {
        if (c.payload.exists) {
            return { ...c.payload.data(), id: c.payload.id };
        } else { return null; }
    }

    private snapshotMapArray = <T>(c: DocumentChangeAction<T>[]) => {
        return c.map(er => ({ ...er.payload.doc.data(), id: er.payload.doc.id }));
    }

    getLodge(id: string): Observable<Lodge> {
        return this.db.doc<Lodge>(`lodges/${id}`).snapshotChanges().pipe(
            map(this.snapshotMapDoc)
        );
    }

    getUsers(): Observable<User[]> {
        this.progress.start();
        return this.auth.lodge$.pipe(
            switchMap(lo => this.db.collection<User>('users', ref => ref.where('lodge', '==', lo.id))
                .valueChanges()),
            catchError(err => { console.log(err); return EMPTY; }),
            tap((a) => this.progress.stop(), (a) => this.progress.stop(), () => this.progress.stop())
        );
    }

    getMyPastEvents(): Observable<EventHandle[]> {
        this.progress.start();
        return this.auth.user$.pipe(
            switchMap(u =>
                this.db.collection<EventHandle>('events',
                    evr => evr.where('lodge', '==', u.lodge)
                        .where('date', '<', new Date())
                        .orderBy('date'))
                    .snapshotChanges().pipe(
                        map(arr => arr.reverse()
                            .map(er => ({ ...er.payload.doc.data(), id: er.payload.doc.id })))
                    )
            ),
            catchError(err => { console.log(err); return EMPTY; }),
            tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
        );
    }

    getMyUpcomingEvents(): Observable<EventHandle[]> {
        this.progress.start();
        return this.auth.user$.pipe(
            switchMap(u =>
                this.db.collection<EventHandle>('events',
                    evr => evr.where('lodge', '==', u.lodge)
                        .where('date', '>=', new Date())
                        .orderBy('date'))
                    .snapshotChanges().pipe(map(this.snapshotMapArray))
            ),
            catchError(err => { console.log(err); return EMPTY; }),
            tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
        );
    }

    saveEvent(event: EventHandle): Observable<any> {
        this.progress.start();
        if (event.id) {
            return from(this.db.doc(`/events/${event.id}`).set(event)).pipe(
                tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop()),
                catchError(err => { console.error(err); return EMPTY; })
            );
        } else {
            delete event.id;
            return from(this.db.collection('events').add(event)).pipe(
                catchError(err => { console.error(err); return EMPTY; }),
                tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
            );
        }
    }

    deleteEvent(event: EventHandle): Observable<void> {
        if (event.id) {
            this.progress.start();
            return from(this.db.doc(`/events/${event.id}`).delete()).pipe(
                catchError(err => { console.error(err); return EMPTY; }),
                tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
            );
        }
    }

    getAttendanceForEvent(event: EventHandle): Observable<Attendance[]> {
        this.progress.start();
        return this.db.collection<Attendance>(`/attendance`, ref => ref
            .where('event', '==', event.id).where('lodge', '==', event.lodge))
            .snapshotChanges()
            .pipe(map(this.snapshotMapArray),
                catchError(err => { console.error(err); return EMPTY; }),
                tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
            );
    }

    saveAttendance(attlist: Attendance[]): Observable<void> {
        this.progress.start();
        const batch = this.db.firestore.batch();
        attlist.forEach(att => {
            if (att.id) {
                batch.set(this.db.firestore.doc(`/attendance/${att.id}`), att);
            } else {
                const ref = this.db.firestore.collection(`/attendance`).doc();
                batch.set(ref, att);
            }
        });
        return from(batch.commit()).pipe(
            catchError(err => { console.error(err); return EMPTY; }),
            tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
        );
    }

    rsvp(attendanceId: string, re: boolean, comment: string): Observable<void> {
        return from(this.db.firestore
            .doc(`/attendance/${attendanceId}`)
            .update({ reply: comment || '', status: re ? 'ACCEPTED' : 'REJECTED' }))
            .pipe(catchError(err => { console.error(err); return EMPTY; }));
    }

    getAttendanceReport(dstart: Date, dend: Date): Observable<AttendanceReport[]> {
        this.progress.start();
        return this.auth.lodge$.pipe(
            filter(lo => lo !== null && lo !== undefined),
            switchMap(lo => this.db.collection<User>('users', ref => ref.where('lodge', '==', lo.id))
                .valueChanges().pipe(
                    switchMap(usrs => from(this.db.collection<Attendance>('attendance', ref => ref
                        .where('lodge', '==', lo.id)
                        .where('date', '<=', firestore.Timestamp.fromDate(dend))
                        .where('date', '>=', firestore.Timestamp.fromDate(dstart))
                    ).valueChanges()).pipe(
                        map(atts => {
                            const re: AttendanceReport[] = [];
                            usrs.forEach(u => {
                                re.push(
                                    atts.reduce((a1, a2) =>
                                        ({
                                            ...a1,
                                            contribution: a1.contribution + a2.contribution,
                                            attendance: a2.present ? a1.attendance + 1 : a1.attendance
                                        }),
                                        { name: u.name, rank: u.rank, contribution: 0, attendance: 0 }));
                            });
                            return re;
                        })
                    )),
                    catchError(err => { console.error(err); return EMPTY; }),
                    tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
                )
            )
        );
    }
}
