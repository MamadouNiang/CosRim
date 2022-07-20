import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { IndexServiceService } from 'src/app/services/index-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { BiblocrudService } from 'src/app/services/biblocrud.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import {UploadserviceService} from '../../services/uploadservice.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  images = [];
  annonce: any;
  color:any;
  nom_section: string;
  valeur: string;
  isAuth: boolean;
  isAccountAdmin: boolean;
  posts=[];
contenus: any;
  user: any;
  mailcurrent = "";
  mailAtelier = '';
  userT: "";
  etablissementT: "";
  zoneT: "";
  roleadmin = 'administrateur';
  roleeleves = 'visiteur';
  UnContenus = [];
  showModal2 = false;
  showModal = false;
  isEnrolled = false;
  constructor(
    private uploadService: UploadserviceService,
    private http: HttpClient,
    private indexcrudservice: IndexServiceService,
    public userService: UserCrudService,
	private router: Router,
	private biblocrudservice: BiblocrudService,
    public authService: AuthService,
    private translate: TranslateService
    ) {
    translate.setDefaultLang('en');
  }
  toImage(){
    window.scrollTo(0,2370);
  }
  editsection(section) {
    console.log("ici");
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
this.getAllContenus();
    this.currentUser();
    this.images.push(this.getAllGallery())
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
    });

    const lang = localStorage.getItem('lang') || 'fr';
    const headers = new HttpHeaders({
      'Accept-Language':lang
    });

    // console.log("=--------",this.http.get("https://firestore.googleapis.com/v1/projects/jamsalam-3aa13/databases/(default)/documents/index/", { headers: headers }));
  }
  toggleModal2() {
    window.scrollTo(0,800);
    this.showModal2 = !this.showModal2;
    this.UnContenus = [];
  }
  seeAteliers(boo:boolean) {
    alert("ici = "+boo);
  }
  myFunction() {
    if(confirm("Veuillez vous inscrire pour acceder aux formations.\n Taper: \n        - Ok pour s'inscrire et continuer \n        - Annuler pour fermer ")){
      this.router.navigateByUrl("/auth/register");
    }else{
      window.scrollTo(0,620);
    }
  }
  isEnroll(contenus:any) {
    console.log(contenus.usersEnrolling);
  }
  getAtelier(contenus: any) {
    window.scrollTo(0,750);
    this.UnContenus.push(contenus);
    console.log(this.UnContenus);
    this.showModal2 = !this.showModal2;
  }
  enroll(id: any, item: any, mailUserEnrol: any) {
    item.usersEnrolling = item.usersEnrolling+";"+mailUserEnrol
    let corps = item.corps;
    let dateCreation = item.dateCreation;
    let mail = item.mail;
    let contenus = item.contenus;
    let zone = item.zone;
    let etablissement = item.etablissement;
    let titre = item.titre;
    let usersEnrolling = item.usersEnrolling;
    let data = { corps, dateCreation, mail, contenus, titre, usersEnrolling ,zone,etablissement};
    // console.log(data);
    if(confirm("voulez allez etre enroller pour les details de l'contenus.\n Taper: \n        - Ok pour confirmer et continuer \n        - Annuler pour fermer ")){
      this.biblocrudservice.updateContenus(id, data);
    } else {
      window.scrollTo(0,0);
    }
  }
  onDeleteContenus(id: any, idC) {
    if(confirm("voulez vous supprimer ce fichier de façon permanente.\n Taper: \n        - Ok pour confirmer et continuer \n        - Annuler pour fermer ")){
      this.biblocrudservice.deleteContenus(id, idC);
    }else{
      window.scrollTo(0,0);
    }

  }
  getAllContenus() {
    this.biblocrudservice.getAllContenus().subscribe((data) => {
      this.contenus = data.map((e) => {
        return {
          isedit: false,
          id: e.payload.doc.id,
          titre: e.payload.doc.data()["titre"],
          contenus: e.payload.doc.data()["contenus"],
          corps: e.payload.doc.data()["corps"],
          dateCreation: e.payload.doc.data()["dateCreation"],
          username: e.payload.doc.data()["username"],
          mail: e.payload.doc.data()["mail"],
          usersEnrolling: e.payload.doc.data()["usersEnrolling"],
          zone: e.payload.doc.data()["zone"],
          etablissement: e.payload.doc.data()["etablissement"],
        };
      });
      // console.log(this.ateliers[0].mail);
    });
  }

  nbreUsersEnroler(users:any) {
    var name =users;
    var splitName = name.split(";");
    var length = splitName.length;
    return length
    // console.log(length);
  }

  isEnrol(users: any) {
    var name =users;
    var splitName = name.split(";");
    var length = splitName.length;
    for (let i = 0; i < length; i++){
      // console.log(splitName[i]);
      if (this.mailcurrent == splitName[i]) {
        this.isEnrolled = true;
        break;
      } else {
        this.isEnrolled = false;
      }
    }
    return this.isEnrolled;
  }

  currentUser() {
    this.userService.getAllUsers().subscribe((data) => {
      this.user = data.map((e) => {
        return {
          id: e.payload.doc.id,
          emailF: e.payload.doc.data()["email"],
          nomPrenom: e.payload.doc.data()["nom_prenom"],
          userTypeF: e.payload.doc.data()["userType"],
          zone: e.payload.doc.data()["zone"],
        };
      });
      for (let i = 0; i < this.user.length; i++) {
        if (this.authService.currentUserName == this.user[i].emailF) {
          let usert = this.user[i].userTypeF;
          let mailF = this.user[i].emailF;
          this.user = this.user[i].nomPrenom;
          this.userT = usert;
          this.mailcurrent = mailF;
          this.zoneT = this.user[i].zone;
        }
      }

    });
  }
  getAllGallery() {
    return this.uploadService.ListePhotos();
  }
  }
