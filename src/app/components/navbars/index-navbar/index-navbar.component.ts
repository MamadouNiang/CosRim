import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavbarComponent implements OnInit {
  isAuth: boolean;
  isAccountAdmin: boolean;
  navbarOpen = false;
  lang;
  echange = false;

  constructor(public userService: UserCrudService , public route:Router) { }

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
              if (user[i].userType === "administrateur") {
                this.isAccountAdmin = true;
              } else {
                this.isAccountAdmin = false;
              }
            }
        }

        }
      });
    });

    // multi-langue
    this.lang = localStorage.getItem('lang') || 'fr';
  }
  toAteliers() {
    this.route.navigateByUrl('/echanges');
  }
  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  ChangeLang(lang) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }


  //scrool
  toContact() {
    document.getElementById('contact').scrollIntoView({behavior:"smooth", block: 'start', inline: 'start'});
  }

  toEquipe() {
    document.getElementById('equipe').scrollIntoView({behavior:"smooth", block: 'start', inline: 'start'});
  }

  toGallerie() {
    window.scrollTo(0,1300);
    // document.getElementById('gallerie').scrollIntoView({behavior:"smooth", block: 'start', inline: 'start'});
  }

  toEchanges() {
    this.echange = true;
    this.route.navigateByUrl("/echanges");
  }

  toFormations() {
    document.getElementById('formations').scrollIntoView({behavior:"smooth", block: 'start', inline: 'start'});
    window.scrollTo(0,620);
  }

  toCarousel() {
    document.getElementById('carousel').scrollIntoView({behavior:"smooth", block: 'start', inline: 'start'});
  }
}

