import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BiblocrudService } from 'src/app/services/biblocrud.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-card-biblo',
  templateUrl: './card-biblo.component.html',
  styleUrls: ['./card-biblo.component.css']
})
export class CardBibloComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

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
    private biblocrudservice: BiblocrudService,
    public userService: UserCrudService,
    public authService: AuthService,


    ) {}

  ngOnInit(): void {
    this.getAllContenus();
    this.currentUser();

  }
  toggleModal2() {
    window.scrollTo(0,0);
    this.showModal2 = !this.showModal2;
    this.UnContenus = [];
  }

  toggleModal() {
    window.scrollTo(0,0);
    this.showModal = !this.showModal;
  }

  isEnroll(contenus:any) {
    console.log(contenus.usersEnrolling);
  }
  getAtelier(contenus: any) {
    window.scrollTo(0,450);
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


}
