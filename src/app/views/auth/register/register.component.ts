import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { ChargemetService } from "../../chargement/chargemet.service";
import * as firebase from 'firebase';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  showModal = false;
  provider:any;

  constructor(private fb: FormBuilder,
    private chargement: ChargemetService,
    private router: Router,
    public authService: AuthService,
    public userService: UserCrudService) { }

    registerType = this.fb.group({
      userType: [
        "",
        [
          Validators.required,
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(8)]],

    });

    errormessage: any;
    error: { name: string; message: string } = { name: "", message: "" };


  register = this.fb.group({
    nom_prenom: ["", Validators.required],
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
      ],
    ],
    password: ["", [Validators.required, Validators.minLength(8)]],
    userType: ["", Validators.required],
    zone: ["", Validators.required],
    etablissement: ["", Validators.required],
    contrat: ["", Validators.required],
  });

  get nom_prenom() {
    return this.register.get("nom_prenom");
  }
  get email() {
    return this.register.get("email");
  }
  get password() {
    return this.register.get("password");
  }
  get userType() {
    return this.register.get("userType");
  }
  get userAccount() {
    return this.register.get("userAccount");
  }

  get contart() {
    return this.register.get("contrat");
  }
  get zone() {
    return this.register.get("zone");
  }
  get etablissement() {
    return this.register.get("etablissement");
  }
  reset() {
    this.register.reset({
      nom_prenom: "",
      email: "",
      password: "",
      contrat: false,
      userType: false,
      zone:'',
      etablissement:'',
    });
    console.log(this.register.value);
  }

  isCollapsed = true;
  focus;
  focustel;
  focus1;
  focus2;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    var provider = new firebase.auth.GoogleAuthProvider();
    this.provider = provider;
  }

  onSubmit() {
    //console.log("ici");
    // // TODO: Use EventEmitter with form value
    const email = this.register.get("email").value;
    const password = this.register.get("password").value;
    const nom_prenom = this.register.get("nom_prenom").value;
    const contrat = this.register.get("contrat").value;
    const userType = this.register.get("userType").value;
    const zone = this.register.get("zone").value;
    const etablissement = this.register.get("etablissement").value;
    let userAccount :Boolean;
    if (userType == "administrateur" ||  "formateur" || "tuteur"  ) {
      userAccount = false;
    }
    if (userType == 'visiteur') {
      userAccount = true;
    }
    console.log(
      email,
      password,
      nom_prenom,
      contrat,
      userType,
      userAccount,
      zone,
      etablissement,
    );
    let data = {
      email,
      password,
      nom_prenom,
      contrat,
      userType,
      userAccount,
      zone,
      etablissement,
    };
    this.chargement.requestStarted();
     this.authService.createNewUser(email, password).then(
       () => {
        this.userService
          .createNewUser(data)
          .then((res) => {
            if (userAccount) {
              alert("Inscription reussi, BIENVENUE ");
              setTimeout(() => {
                this.router.navigateByUrl("/landing");
                this.chargement.requestEnded();
             },1500);
            } else {
              this.authService.signOutUser();
              this.authService.signOutAuthAccount();
              alert("Inscription reussi, veuillez attendre la validation de votre compte");
              setTimeout(() => {
                this.router.navigateByUrl("auth/login");
                this.chargement.requestEnded();
             }, 1000);
            }

          })
          .catch((error) => {
            this.errormessage = error;
          });
      },
      (error) => {
        this.errormessage = error;
      }
    );
    // this.authService.createNewUser(email, password).then(
    //   () => {
    //     this.userService
    //       .createNewUser(data)
    //       .then((res) => {
    //         alert("Inscription reussi, veuillez attendre la validation de votre compte");
    //         this.authService.signOutUser();
    //         this.authService.signOutAuthAccount();
    //         this.router.navigateByUrl("auth/login");
    //       })
    //       .catch((error) => {
    //         this.errormessage = error;
    //       });
    //   },
    //   (error) => {
    //     this.errormessage = error;
    //   }
    // );
  }

  onSignGoogle() {
    window.scrollTo(0,0);
    this.showModal = !this.showModal;

  }

  onSubmit2() {
    const userTypeF = this.registerType.get("userType").value;
    const passwordF = this.registerType.get("password").value;
    // alert(userType+"  -  "+password);
    let dataG: any;


    firebase.auth().signInWithPopup(this.provider).then(
      (result) => {

        if (userType == "administrateur" || "formateur" || "tuteur") {
          var userAccountF = false;
        }
        if (userType == "visiteur") {
          userAccountF = true;
        }
        let password = passwordF;
        var userAccount= userAccountF;
        var nom_prenom: any;
        var contrat = true;
        var userType = userTypeF;
        var user = result.user;
        let email = user.email;
        nom_prenom = user.displayName;
        dataG = {
          email,
          password,
          nom_prenom,
          contrat,
          userType,
          userAccount,
        };
        // console.log(userAccountF);

        console.log(userType);
        if (userType === "visiteur") {
          userAccountF = true;
        }
        console.log(userAccountF);
        this.chargement.requestStarted();
          this.userService
            .createNewUser(dataG)
            .then((res) => {
              var user = firebase.auth().currentUser;
              var newPassword =password;
              user.updatePassword(newPassword).then(function () {
                // this.router.navigateByUrl("/profile");
                // alert("Bienvenue ...");
              }).catch(function(error) {
                alert(error);
              });
              if (userAccountF) {
                alert("Inscription reussi, BIENVENUE ");
                setTimeout(() => {
                  this.router.navigateByUrl("/landing");
                  this.chargement.requestEnded();
               },1500);
              } else {
                this.authService.signOutUser();
                this.authService.signOutAuthAccount();
                alert("Inscription reussi, veuillez attendre la validation de votre compte");
                setTimeout(() => {
                  this.router.navigateByUrl("auth/login");
                  this.chargement.requestEnded();
               }, 1000);
              }
            })
            .catch((error) => {
              this.errormessage = error;
            });
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        }
      );
  }

  onSignFacebook() {
    alert("facebook");

  }
}
