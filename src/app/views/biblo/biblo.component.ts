import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BiblocrudService } from 'src/app/services/biblocrud.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-biblo',
  templateUrl: './biblo.component.html',
  styleUrls: ['./biblo.component.css']
})
export class BibloComponent implements OnInit {

  roleadmin = 'administrateur';
  roleeleves = 'visiteur';
  infoUser: any;
  user: any;
  mailcurrent = "";
  userT: "";
  showModal = false;
  openTab = 1;
  ContenusForm: FormGroup;
  fileUploaded = false;
  fileIsUploading = false;
  fileUrl: string;

  errormessage: any;
  datime: any;
  contenus: any;
  titre: string;
  corps: any;
  etablissement: any;
  zone: any;
  usersEnrroll: any;
  detshowModal = false;
  perm = false;
  isAuth: boolean;




  constructor(
    private  route : Router,     private fb: FormBuilder,
    private biblocrudservice: BiblocrudService,
    public authService: AuthService,    public userService: UserCrudService,

  ) {
    const D = new Date().getDate();
    const M = new Date().getMonth();
    const Y = new Date().getFullYear();
    const H = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();
    this.datime = Y + "-" + M + "-" + D + "  " + H + " :" + m + " :" + s;
  }

  initForm() {
    this.ContenusForm = this.fb.group({
      titre: ["", Validators.required],
      usersEnrroll: ["" ],
      contenus: ["", Validators.required],
      corps: ["", Validators.required],
      etablissement: ["", Validators.required],
      zone: ["", Validators.required],
      dateCreation: [
        { value: this.datime, disabled: true },
        Validators.required,
      ],
      user: [{ value: this.user, disabled: true }, Validators.required],
      mail: [{ value: this.mailcurrent, disabled: true }, Validators.required],
    });
  }

  onSaveContenus() {
    let titre = this.ContenusForm.get("titre").value;
    let usersEnrolling =this.mailcurrent;
    let contenus = this.ContenusForm.get("contenus").value;
    let corps = this.ContenusForm.get("corps").value;
    let etablissement = this.ContenusForm.get("etablissement").value;
    let zone = this.ContenusForm.get("zone").value;
    let dateCreation = this.ContenusForm.get("dateCreation").value;
    let username = this.user;
    let mail = this.mailcurrent;
    // let newContenus= new Atelier(
    //   titre,
    //   photo,
    //   corps,
    //   video,
    //   dateCreation,
    //   usersEnrolling,
    //   etablissement,
    //   zone,
    // );
    let data = {
      titre,
      contenus,
      corps,
      dateCreation,
      username,
      mail,
      usersEnrolling,
      etablissement,
      zone,
    };
    // console.log(data);
    if (this.fileUrl && this.fileUrl !== "") {
      data.contenus = this.fileUrl;
    }

    // this.annonceService.createNewMarchandise(newMarchandise);
    this.biblocrudservice
      .createNewContenus(data)
      .then((res) => {
      // this.router.navigate(["/landing"]);
      })
      .catch((error) => {
        this.errormessage = error;
      });
     this.fileUploaded = false;
    // this.fileUploaded1 = false;
    this.ContenusForm.reset();
    this.showModal = !this.showModal;
  }
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.biblocrudservice.uploadFile(file).then((url: string) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  reset() {
    this.ContenusForm.reset({
      titre: "",
      contenus: "",
      corps: "",
    });
    this.fileUploaded = false;
  }

  toggleModal() {
    window.scrollTo(0,0);
    this.showModal = !this.showModal;
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  toEchanges() {
    this.route.navigateByUrl('/echanges');
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

    // getContenus(contenus: any) {
    //   window.scrollTo(0,70);
    //   this.UnContenus.push(contenus);
    //   console.log(this.UnContenus);
    //   this.showModal2 = !this.showModal2;
    //   return this.UnContenus;
    // }
    // isEnroll(atelier:any) {
    //   this.getContenus(atelier);
    //   alert(atelier.usersEnrolling);
    // }

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
            usersEnrroll: e.payload.doc.data()["usersEnrroll"],
            mail: e.payload.doc.data()["mail"],
            etablissement: e.payload.doc.data()["etablissement"],
            zone: e.payload.doc.data()["zone"],
          };
        });
        console.log(this.contenus);
      });
    }

  ngOnInit(): void {
    // this.getAll();
    this.currentUser();
    this.initForm();
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
