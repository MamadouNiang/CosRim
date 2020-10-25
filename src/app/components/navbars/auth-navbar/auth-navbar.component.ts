import { Component, OnInit } from "@angular/core";
import * as firebase from 'firebase';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  isAuth: boolean;
  isAccountAdmin: boolean;
  navbarOpen = false;

  constructor(public userService: UserCrudService) {}

  ngOnInit(): void {

    //info du user
    firebase.auth().onAuthStateChanged((useri) => {
      if (useri) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
      this.userService.getAllUsers().subscribe((data) => {
        const user = data.map((e) => {
          return {
            id: e.payload.doc.id,
            emailF: e.payload.doc.data()["email"],
            userType: e.payload.doc.data()["userType"],
          };
        });
        for (let i = 0; i < user.length; i++) {
          if (useri === null) {
            // console.log("ici je suis null i pass");
          } else {
            if (useri.email == user[i].emailF) {
              if (user[i].userType == "administrateur") {
                this.isAccountAdmin = true;
              } else {
                this.isAccountAdmin = false;
              }
            }
          }

        }
      });
    });
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
