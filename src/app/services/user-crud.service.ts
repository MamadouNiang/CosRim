import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {
  user: any;
  datas = [];
  Item: any;
  constructor(public fireservice: AngularFirestore,
   ) {}

   ngOnInit(item): void {
      this.datas = [];
      this.Item = item;
      this.getAllUsers().subscribe((data) => {
        this.user = data.map((e) => {
          return {
            isedit: false,
            id: e.payload.doc.id,
            nom_prenom: e.payload.doc.data()["nom_prenom"],
            email: e.payload.doc.data()["email"],
            userType: e.payload.doc.data()["userType"],
            userAccount: e.payload.doc.data()["userAccount"],
            contrat: e.payload.doc.data()["contrat"],
          };
        });
        for (let i = 0; i < this.user.length; i++) {
          if (this.user[i].userType === item) {
            this.datas.push(this.user[i]);
          } else {
          }
        }
        console.log(this.datas);
      });
  }

  createNewUser(data) {
    return this.fireservice.collection("users").add(data);
  }

  updateUser(id, user) {
    this.fireservice.doc("users/" + id).update(user);
  }

  getAllUsers(): Observable<any> {
    return this.fireservice.collection("users").snapshotChanges();
  }


getUsers(item) {
  this.datas = [];
  this.Item = item;
  this.getAllUsers().subscribe((data) => {
    this.user = data.map((e) => {
      return {
        isedit: false,
        id: e.payload.doc.id,
        nom_prenom: e.payload.doc.data()["nom_prenom"],
        email: e.payload.doc.data()["email"],
        userType: e.payload.doc.data()["userType"],
        userAccount: e.payload.doc.data()["userAccount"],
        contrat: e.payload.doc.data()["contrat"],
      };
    });
    for (let i = 0; i < this.user.length; i++) {
      if (this.user[i].userType === item) {
        this.datas.push(this.user[i]);
      } else {
      }
    }
    console.log(this.datas);
  });
}

  getData() {
    return this.datas;
  }


  deleteUser(id) {
    this.fireservice.doc("users/" + id).delete();
  }
}
