import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
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
        // this.user$ = this.afAuth.authState.pipe(
        //     switchMap(auth => {
        //         if (auth && !auth.isAnonymous) {
        //             return this.db.collection('user', ref => ref.where('email', '==', auth.email))
        //                 .valueChanges().pipe(map(c => c[0]));
        //         } else {
        //             return of(null);
        //         }
        //     }),
        //     shareReplay(1)
        // );

        this.user$ = new BehaviorSubject(null);
        this.lodge$ = new BehaviorSubject(null);
    }


    public login(user: string, password: string): Observable<any> {
        // this.progress.start();
        // return from(this.afAuth.signInWithEmailAndPassword(user, password))
        //     .pipe(tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop()));
        // tap next,error and complete
        (this.user$ as BehaviorSubject<User>).next({
            email: 'tom@masons.ro', name: 'Thomas Dunkerley', status: 'ACTIVE', rank: 'MASTER', privilege: 'USER'
        });
        (this.lodge$ as BehaviorSubject<Lodge>).next({
            name: 'Toleranță și Fraternitate', number: 77, orient: { country: 'România', principal: 'București' }
        });
        return of(null);
    }

    public logout(): void {
        (this.user$ as BehaviorSubject<User>).next(null);
        (this.lodge$ as BehaviorSubject<Lodge>).next(null);
        // this.afAuth.signOut();
        // this.router.navigate(['login']);
    }


    public register(user: User): Observable<any> {
        this.progress.start();
        const pass = user.password;
        delete user.password;
        return from(this.db.collection('users').doc(user.email).set(user)).pipe(
            switchMap(u => from(this.afAuth.createUserWithEmailAndPassword(user.email, pass))),
            tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
        );
    }

    public resetPassword(email: string): Observable<any> {
        this.progress.start();
        return from(this.afAuth.sendPasswordResetEmail(email)).pipe(
            tap(() => this.progress.stop(), () => this.progress.stop(), () => this.progress.stop())
        );
    }

    public changePassword(newPass: string): Observable<void> {
        return from(this.afAuth.currentUser).pipe(switchMap(u => u.updatePassword(newPass)));
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
