import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AuthService } from "src/app/services/auth.service";
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  isAuth: boolean;
  isAccountAdmin: boolean;
  navbarOpen = false;

  constructor(public userService: UserCrudService, private authService: AuthService,public route:Router) {}
  onSignOut() {
    if(confirm("êtes-vous sûr de vouloir vous déconnecter.\n Taper: \n        - Ok pour confirmer et continuer \n        - Annuler pour fermer ")){
      this.authService.signOutUser();
    }else{

    }

  }

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
  users() {
    this.route.navigateByUrl("/users/agents");
  }
}
