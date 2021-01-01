import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Note that this is the whole user object from authentication, not the UID.
  user = null;
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private ngZone: NgZone, private router: Router) { }

  setUser(user: any) {
    this.user = user;
    this.isLoggedIn.next(!!user);
  }

  getUser() {
    return this.user;
  }

  getUserUID() {
    return this.user.uid;
  }

  // Synchronous and instant retrieval of auth state.
  isAuthenticated() {
    return !!this.user;
  }

  // This is essentially the observable version of isAuthenticated().
  // Used only for the header component at this moment in time.
  isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }

  doLoginWithEmailAndPassword(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().signInWithEmailAndPassword(email, password)
        .then(
          (res) => resolve(res),
          (err) => reject(err));
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let googleProvider = new firebase.default.auth.GoogleAuthProvider();
      // Not sure what these do.
      // googleProvider.addScope('profile');
      // googleProvider.addScope('email');

      firebase.default.auth().signInWithPopup(googleProvider)
        .then((res) => resolve(res));
    });
  }

  doRegisterWithEmailAndPassword(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().createUserWithEmailAndPassword(email, password)
        .then(
          (res) => resolve(res),
          (err) => reject(err))
    });
  }

  doLogout() {
    firebase.default.auth().signOut()
      .then(() => {

        // Set user to null.
        this.setUser(null);

        // Navigate to guest diary (home).
        this.router.navigateByUrl('home')
          .then(() => window.location.reload()); // Manual page reload.
      })
      .catch((error) => console.log('Problem signing out:' + error));
  }
}
