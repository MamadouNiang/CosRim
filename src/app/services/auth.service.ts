import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCrudService } from './user-crud.service';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  errormessage: any;
  error: { name: string; message: string } = { name: "", message: "" };

  constructor(
    private afu: AngularFireAuth,
    private router: Router,
    public userService: UserCrudService
  ) {
    this.afu.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  signInUser(email: string, password: string) {
    return new Promise((resole, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            console.log("ok ");

            resole();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  get isUserAnonymousLoggedIn(): boolean {
    return this.authState !== null ? this.authState.isAnonymos : false;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : "";
  }

  get currentUserName(): string {
    return this.authState["email"];
  }

  get currentUser(): any {
    return this.authState !== null ? this.authState : false;
  }

  get isUserEmailLoggedIn() {
    if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

  signOutUser() {
    firebase.auth().signOut();
    // this.router.navigate["auth/login"];
  }
  signOutAuthAccount() {
    firebase.auth().signOut();
    // this.router.navigate["auth/"];
  }
}
