import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { Subject } from 'rxjs';



@Injectable()

export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;
    constructor(private router: Router, public afAuth: AngularFireAuth) {

    }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/profiles']);
            } else {

                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }


    register(user: User) {
        this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                console.log(res);
                this.isAuthenticated = true;
            }).catch(error => {
                console.log(error)
            })
        this.authChange.next(true);
    }


    login(user: User) {
        this.afAuth.signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                console.log(res);
                this.isAuthenticated = true;
            }).catch(error => {
                console.log(error)
            })
        this.authChange.next(true);
    }


    logout() {
        this.afAuth.signOut();
        this.isAuthenticated = false;
        this.authChange.next(false);
    }

    isAuth() {
        return this.isAuthenticated;
    }
}