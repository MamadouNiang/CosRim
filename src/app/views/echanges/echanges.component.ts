import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-echanges',
  templateUrl: './echanges.component.html',
  styleUrls: ['./echanges.component.css']
})
export class EchangesComponent implements OnInit {
  infoUser: any;
  user: any;
  mailcurrent = "";
  userT: "";



  constructor(public route : Router,    public authService: AuthService,    public userService: UserCrudService,

  ) { }

  toEchanges() {
    document.getElementById('echanges').scrollIntoView({behavior:"smooth", block: 'start', inline: 'start'});
    // window.scrollTo(0,650);
  }

  toFormations() {
    this.route.navigateByUrl('/landing');
    // alert("ici");
    window.scrollTo(0,370);
  }

  toBib() {
    this.route.navigateByUrl('/biblo');

  }

    currentUser() {
      this.userService.getAllUsers().subscribe((data) => {
        this.user = data.map((e) => {
          return {
            id: e.payload.doc.id,
            emailF: e.payload.doc.data()["email"],
            nomPrenom: e.payload.doc.data()["nom_prenom"],
            userTypeF: e.payload.doc.data()["userType"],
          };
        });
        for (let i = 0; i < this.user.length; i++) {
          if (this.authService.currentUserName == this.user[i].emailF) {
            let usert = this.user[i].userTypeF;
            let mailF = this.user[i].emailF;
            this.user = this.user[i].nomPrenom;
            this.userT = usert;
            this.mailcurrent = mailF;
          }
        }
        console.log(this.authService.currentUserName);
      });
    }
  ngOnInit(): void {
    this.currentUser();
    this.infoUser = this.authService.currentUser;

  }

  // fb() {
  //   this.route.navigateByUrl("https://www.facebook.com/JamSalam-105580808085458");

  // }

  // ig() {
  //   this.route.navigateByUrl("https://www.instagram.com/niang_mamadou_/?hl=fr");
  // }

  wp() {
    alert("en cours de traitement ...")
  }

  sms() {
    alert("message envoyer nous vous repondre sous peu ")
  }

}

