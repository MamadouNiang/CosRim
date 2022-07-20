import { Component, OnInit, Input } from "@angular/core";
import { AteliercrudService } from 'src/app/services/ateliercrud.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
  styleUrls: ["./card-table.component.scss"],

})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  ateliers: any;
  user: any;
  mailcurrent = "";
  mailAtelier = '';
  userT: "";
  etablissementT: "";
  zoneT: "";
  roleadmin = 'administrateur';
  roleeleves = 'visiteur';
  UnAtelier = [];
  showModal2 = false;
  showModal = false;
  isEnrolled = false;

  constructor(
    private ateliercrudservice: AteliercrudService,
    public userService: UserCrudService,
    public authService: AuthService,


    ) {}

  ngOnInit(): void {
    this.getAllAteliers();
    this.currentUser();

  }
  toggleModal2() {
    window.scrollTo(0,0);
    this.showModal2 = !this.showModal2;
    this.UnAtelier = [];
  }

  toggleModal() {
    window.scrollTo(0,0);
    this.showModal = !this.showModal;
  }

  isEnroll(atelier:any) {
    console.log(atelier.usersEnrolling);
  }
  getAtelier(atelier: any) {
    window.scrollTo(0,1350);
    this.UnAtelier.push(atelier);
    console.log(this.UnAtelier);
    this.showModal2 = !this.showModal2;
  }
  enroll(id: any, item: any, mailUserEnrol: any) {
    item.usersEnrolling = item.usersEnrolling+";"+mailUserEnrol
    let corps = item.corps;
    let dateCreation = item.dateCreation;
    let mail = item.mail;
    let photo = item.photo;
    let zone = item.zone;
    let etablissement = item.etablissement;
    let titre = item.titre;
    let usersEnrolling = item.usersEnrolling;
    let video = item.video;
    let data = { corps, dateCreation, mail, photo, titre, usersEnrolling, video ,zone,etablissement};
    // console.log(data);
    if(confirm("voulez allez etre enroller pour les details de l'ateliers.\n Taper: \n        - Ok pour confirmer et continuer \n        - Annuler pour fermer ")){
      this.ateliercrudservice.updateAtelier(id, data);
    } else {
      window.scrollTo(0,0);
    }
  }
  onDeleteAtelier(id: any, idp: any, idv: any) {
    if(confirm("voulez vous supprimer ce fichier de façon permanente.\n Taper: \n        - Ok pour confirmer et continuer \n        - Annuler pour fermer ")){
      this.ateliercrudservice.deleteatelier(id, idp,idv);
    }else{
      window.scrollTo(0,0);
    }

  }
  getAllAteliers() {
    this.ateliercrudservice.getAllAteliers().subscribe((data) => {
      this.ateliers = data.map((e) => {
        return {
          isedit: false,
          id: e.payload.doc.id,
          titre: e.payload.doc.data()["titre"],
          photo: e.payload.doc.data()["photo"],
          corps: e.payload.doc.data()["corps"],
          video: e.payload.doc.data()["video"],
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
