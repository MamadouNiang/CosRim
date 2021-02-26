import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { ChargemetService } from '../../chargement/chargemet.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  isAuth: boolean;
  isAccountAdmin: boolean;
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  errormessage: string;
  provider:any;
  user:any;

  constructor(
    private chargement: ChargemetService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserCrudService) {}
    register = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      password: [
        "",
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)],
      ],
    });

    onSubmit() {
      // TODO: Use EventEmitter with form value
      // console.warn(this.register.value);
      const email = this.register.get("email").value;
      const password = this.register.get("password").value;
      this.chargement.requestStarted();
      this.authService.signInUser(email, password).then(
        () => {

          // this.router.navigateByUrl("/profile");
          this.userService.getAllUsers().subscribe((data) => {
            const user = data.map((e) => {
              return {
                id: e.payload.doc.id,
                emailF: e.payload.doc.data()["email"],
                userAccount: e.payload.doc.data()["userAccount"],
              };
            });

            for (let i = 0; i < user.length; i++) {
              if (email == user[i].emailF) {
                if (user[i].userAccount == true) {
                  setTimeout (() => {
                    this.router.navigateByUrl("/landing");
                    this.chargement.requestEnded();
                 }, 3000);
                  break;
                } else {
                  setTimeout (() => {
                    this.errormessage = "Compte non Activer ou Supprimer";
                    this.onSignOut();
                    this.chargement.resetSpinner();
                    this.chargement.requestEnded();
                 }, 1500);

                }
              }
            }
          });
        },
        (error) => {
          setTimeout (() => {
            this.errormessage = error;
            this.chargement.resetSpinner();
            this.chargement.requestEnded();
         }, 1500);

        }
      );
    }

    get email() {
      return this.register.get("email");
    }
    get password() {
      return this.register.get("password");
    }

    scrollToDownload(element: any) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  loginWithGmailInsert(data:any) {
    alert(data);
}
  loginWithGmail() {
    let dataG: any;

    firebase.auth().signInWithPopup(this.provider).then(
       (result)=>
      {

        let password = '';
        var nom_prenom:any;
        var contrat = 'true';
        var userType ="changer";
        var userAccount= 'true';
        var user = result.user;
        let email =user.email;
        nom_prenom = user.displayName;
        dataG = {
          email,
          password,
          nom_prenom,
          contrat,
          userType,
          userAccount,
        };
        this.userService
          .createNewUser(dataG)
          .then((res) => {
            var user = firebase.auth().currentUser;
            var newPassword ='12345678';
            user.updatePassword(newPassword).then(function () {
              this.router.navigateByUrl("/profile");
              alert("Bienvenue, veuillez Mettre a jours votre compte\nVotre mot de passe par defaut est : 12345678");

            }).catch(function(error) {
              alert(error);
            });

          })
          .catch((error) => {
            this.errormessage = error;
          });
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

  }

  ngOnInit() {

    var provider = new firebase.auth.GoogleAuthProvider();
    this.provider = provider;
    firebase.auth().onAuthStateChanged(user=> {
      this.user = user;
    });

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
                if (user[i].userType == "Employé") {
                  this.isAccountAdmin = true;
                } else {
                  this.isAccountAdmin = false;
                }
              }
            }

          }
        });
      });

      var body = document.getElementsByTagName("body")[0];
      body.classList.add("index-page");
      var slider = document.getElementById("sliderRegular");
      var slider2 = document.getElementById("sliderDouble");
    }

    onSignOut() {
      this.authService.signOutUser();
    }
    onSignOutA() {
      this.authService.signOutAuthAccount();
    }

    ngOnDestroy() {
      // var body = document.getElementsByTagName("body")[0];
      // body.classList.remove("index-page");
    }

  onSignGoogle() {

  }

  onSignFacebook() {
    alert("facebook");

  }
}
