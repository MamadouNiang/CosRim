import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

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

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public userService: UserCrudService) {}
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
                if (user[i].userAccount == "true") {
                  this.router.navigateByUrl("/landing");
                  break;
                } else {
                  this.errormessage = "Compte non Activer ou Supprimer";
                  this.onSignOut();
                }
              }
            }
          });
        },
        (error) => {
          this.errormessage = error;
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
    ngOnInit() {
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
}
