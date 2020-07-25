import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProgressService } from './progress';

import { User } from '../domain/user';
import { Lodge } from '../domain/lodge';

declare const grecaptcha: any;

@Injectable()
export class AuthService implements CanActivate {

    public user$: Observable<User>;
    public lodge$: Observable<Lodge>;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private progress: ProgressService) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(auth => {
                if (auth && !auth.isAnonymous) {
                    return this.db.doc(`/users/${auth.email}`)
                        .valueChanges();
                } else {
                    return of(null);
                }
            }),
            shareReplay(1)
        );
        this.lodge$ = this.user$.pipe(
            switchMap(u => {
                if (u === null) {
                    return of(null);
                } else {
                    return this.db.doc(`/lodges/${u.lodge}`)
                        .snapshotChanges().pipe(
                            map(c => {
                                if (c.payload.exists) {
                                    return { ...c.payload.data(), id: c.payload.id };
                                } else { return null; }
                            })
                        );
                }
            }),
            shareReplay(1)
        );
    }


    public login(user: string, password: string): Observable<any> {
        this.progress.start();
        return from(this.afAuth.auth.signInWithEmailAndPassword(user, password))
            .pipe(tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop()));
        // tap next,error and complete
    }

    public logout() {
        this.afAuth.auth.signOut();
        this.router.navigate(['login']);
    }


    public register(user: User): Observable<any> {
        this.progress.start();
        const pass = user.password;
        delete user.password;
        return from(this.db.collection('users').doc(user.email).set(user)).pipe(
            switchMap(u => from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, pass))),
            tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
        );
    }

    public resetPassword(email: string): Observable<any> {
        this.progress.start();
        return from(this.afAuth.auth.sendPasswordResetEmail(email)).pipe(
            tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
        );
    }

    public changePassword(newPass: string): Observable<void> {
        return from(this.afAuth.auth.currentUser.updatePassword(newPass));
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.afAuth.authState.pipe(map(s => {
            if (s === null) {
                this.router.navigate(['login']);
            }
            return s !== null;
        }));
    }
}
