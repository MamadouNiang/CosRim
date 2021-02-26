import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserCrudService } from "src/app/services/user-crud.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService, public userService: UserCrudService,private router: Router,
    ) { }

  modifierProfil = false;
  user: any;
  mailcurrent = "";
  userT: "";
  zone: '';
  etablissement:''

  infoUser :any;
  ngOnInit(): void {
    this.infoUser = this.authService.currentUser;
    this.currentUser();
  }

  isEditProfil() {
    this.modifierProfil = !this.modifierProfil;
  }

  currentUser() {
    this.userService.getAllUsers().subscribe((data) => {
      this.user = data.map((e) => {
        return {
          id: e.payload.doc.id,
          emailF: e.payload.doc.data()["email"],
          nomPrenom: e.payload.doc.data()["nom_prenom"],
          userTypeF: e.payload.doc.data()["userType"],
          zoneF: e.payload.doc.data()["zone"],
          etablissementF: e.payload.doc.data()["etablissement"],
        };
      });
      for (let i = 0; i < this.user.length; i++) {
        if (this.authService.currentUserName == this.user[i].emailF) {
          let usert = this.user[i].userTypeF;
          let mailF = this.user[i].emailF;
          let zonet = this.user[i].zoneF;
          let etablissementt = this.user[i].etablissementF;
          this.user = this.user[i].nomPrenom;
          this.userT = usert;
          this.mailcurrent = mailF;
          this.zone = zonet;
          this.etablissement = etablissementt;

        }
      }
    });
  }

  retour() {
    this.router.navigateByUrl("/landing");
}


}
