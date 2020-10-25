import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  constructor( private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public userService: UserCrudService) { }

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
  reset() {
    this.register.reset({
      nom_prenom: "",
      email: "",
      password: "",
      contrat: false,
      userType: "",
    });
    console.log(this.register.value);
  }

  isCollapsed = true;
  focus;
  focustel;
  focus1;
  focus2;

  ngOnInit(): void { }

  onSubmit() {
    console.log("ici");
    // // TODO: Use EventEmitter with form value
    const email = this.register.get("email").value;
    const password = this.register.get("password").value;
    const nom_prenom = this.register.get("nom_prenom").value;
    const contrat = this.register.get("contrat").value;
    const userType = this.register.get("userType").value;
    let userAccount;
    if (userType == "administrateur" ||  "agent" || "professeur" || "eleves" ) {
      userAccount = "false";
    } else {
      userAccount = "true";
    }
    console.log(
      email,
      password,
      nom_prenom,
      contrat,
      userType,
      userAccount
    );
    let data = {
      email,
      password,
      nom_prenom,
      contrat,
      userType,
      userAccount,
    };
    this.authService.createNewUser(email, password).then(
      () => {
        this.userService
          .createNewUser(data)
          .then((res) => {
            alert("Inscription reussi, veuillez attendre la validation de votre compte");
            this.authService.signOutUser();
            this.authService.signOutAuthAccount();
            this.router.navigateByUrl("auth/login");
          })
          .catch((error) => {
            this.errormessage = error;
          });
      },
      (error) => {
        this.errormessage = error;
      }
    );
  }

}
