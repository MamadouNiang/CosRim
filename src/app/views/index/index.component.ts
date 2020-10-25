import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import * as firebase from 'firebase';
import { IndexServiceService } from 'src/app/services/index-service.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
})
export class IndexComponent implements OnInit {
  annonce: any;
  nom_section: string;
  valeur: string;
  isAuth: boolean;
  isAccountAdmin: boolean;

  constructor(
    private http: HttpClient,
    private indexcrudservice: IndexServiceService,
    public userService: UserCrudService) {}




  editsection(section) {
    section.isedit = true;
    section.editnom_section = section.nom_section;
    section.editvaleur = section.valeur;
  }
  modifiersection(section) {
    let data = {};
    data["nom_section"] = section.editnom_section;
    data["valeur"] = section.editvaleur;
    console.log(section.id+"-----"+data)
    this.indexcrudservice.updateAnonce(section.id, data);
    section.isedit = false;
}

  supprimer(id) {
    this.indexcrudservice.deleteAnnonce(id);
}

  viewsection(item) {}

  ngOnInit() {

    //info du user
    firebase.auth().onAuthStateChanged((useri) => {
      // console.log(useri.email);
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
            if (useri.email === user[i].emailF) {
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

    this.indexcrudservice.getAllAnnonces().subscribe((data) => {
      this.annonce = data.map((e) => {
        return {
          id: e.payload.doc.id,
          nom_section: e.payload.doc.data()["nom_section"],
          valeur:e.payload.doc.data()["valeur"]
        };
      });
      console.log(this.annonce);
    });

    const lang = localStorage.getItem('lang') || 'fr';
    const headers = new HttpHeaders({
      'Accept-Language':lang
    });

  }
  }
