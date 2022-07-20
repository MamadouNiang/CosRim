import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {createPopper} from '@popperjs/core/lib/popper-lite';
import * as firebase from 'firebase';
import {UserCrudService} from 'src/app/services/user-crud.service';

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavbarComponent implements OnInit {

  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', {static: false}) btnDropdownRef: ElementRef;
  popper = document.createElement("div");

  isAuth: boolean;
  isAccountAdmin: boolean;
  navbarOpen = false;
  lang;
  echange = false;

  constructor(public translate: TranslateService, public userService: UserCrudService, public route: Router) {
    if (localStorage.getItem("langue") === null) {
      translate.setDefaultLang('fr');
    } else {
      translate.setDefaultLang(localStorage.getItem("langue"));
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

    //le ng select pour la liste deroulante
    // this.popper.innerHTML = ``;
  }

  toggleDropdown($event: MouseEvent) {
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
      this.destroyPopper();
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }

  destroyPopper() {
    this.popper.parentNode.removeChild(this.popper);
  }

  createPoppper() {
    createPopper(this.btnDropdownRef.nativeElement, this.popper, {
      placement: "bottom-start"
    });
    this.btnDropdownRef.nativeElement.parentNode.insertBefore(this.popper, this.btnDropdownRef.nativeElement.nextSibling);

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
    document.getElementById('contact').scrollIntoView({behavior: "smooth", block: 'start', inline: 'start'});
  }

  toEquipe() {
    document.getElementById('equipe').scrollIntoView({behavior: "smooth", block: 'start', inline: 'start'});
  }

  toGallerie() {
    window.scrollTo(0, 2600);
    // document.getElementById('gallerie').scrollIntoView({behavior:"smooth", block: 'start', inline: 'start'});
  }

  toEchanges() {
    this.echange = true;
    this.route.navigateByUrl("/echanges");
  }

  toFormations() {
    document.getElementById('formations').scrollIntoView({behavior: "smooth", block: 'start', inline: 'start'});
    window.scrollTo(0, 700);
  }

  toFormations2() {
    document.getElementById('formations').scrollIntoView({behavior: "smooth", block: 'start', inline: 'start'});
    window.scrollTo(0, 1700);
  }

  toCarousel() {
    document.getElementById('carousel').scrollIntoView({behavior: "smooth", block: 'start', inline: 'start'});
  }


  useLanguage(language: string) {
    alert(language);
    //this.translate.use(language);
    localStorage.setItem("langue", language)
  }
}

