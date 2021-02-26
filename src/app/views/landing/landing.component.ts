import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Atelier } from 'src/app/models/atelier';
import { AteliercrudService } from 'src/app/services/ateliercrud.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import * as firebase from 'firebase';


@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.components.scss"],

})
export class LandingComponent implements OnInit {
  valuesImg = [];
  infoUser :any;

  roleadmin = 'administrateur';
  roleeleves = 'visiteur';
  UnAtelier = [];
  ateliers: any;
  atelierForm: FormGroup;
  fileUploaded = false;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded1 = false;
  fileIsUploading1 = false;
  fileUrl1: string;
  errormessage: any;
  datime: any;
  user: any;
  atelier: any;
  titre: string;
  photo: any;
  corps: any;
  etablissement: any;
  zone: any;
  usersEnrroll: any;
  video: any;
  mailcurrent = "";
  userT: "";
  showModal = false;
  showModal2 = false;

  detshowModal = false;
  perm = false;
  isAuth: boolean;


  constructor(
    private fb: FormBuilder,
    public userService: UserCrudService,
    public authService: AuthService,
    private ateliercrudservice: AteliercrudService,
    private router: Router,
  ) {
    const D = new Date().getDate();
    const M = new Date().getMonth();
    const Y = new Date().getFullYear();
    const H = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();
    this.datime = Y + "-" + M + "-" + D + "  " + H + " :" + m + " :" + s;
  }

   removevalueImg(i){
    this.valuesImg.splice(i,1);
  }

  addvalueImg(event) {
    this.detectFiles(event);
    this.valuesImg.push({value: ""});
  }


  toggleModal() {
    window.scrollTo(0,0);
    this.showModal = !this.showModal;
  }

  toggleModal2() {
    window.scrollTo(0,0);
    this.showModal2 = !this.showModal2;
  }

  dettoggleModal() {
    window.scrollTo(0,0);
    this.detshowModal = !this.detshowModal;
  }

  ngOnInit(): void {
    // window.scrollTo(0,0);
    this.getAllAteliers();
    this.currentUser();
    this.initForm();
    this.infoUser = this.authService.currentUser;
    console.log(this.infoUser);

  }

  topFunction(){

  }

  toFormations() {
    document.getElementById('formations').scrollIntoView({behavior:"smooth", block: 'start', inline: 'start'});
    // window.scrollTo(0,650);
  }

  toEchanges() {
    this.router.navigateByUrl('/echanges');
    window.scrollTo(0,370);
  }

  toBib() {
    this.router.navigateByUrl('/biblo');
    window.scrollTo(0,370);

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
          usersEnrroll: e.payload.doc.data()["usersEnrroll"],
          mail: e.payload.doc.data()["mail"],
          etablissement: e.payload.doc.data()["etablissement"],
          zone: e.payload.doc.data()["zone"],
        };
      });
      console.log(this.ateliers);
    });
  }
  enrol(){

  }
  getAtelier(atelier: any) {
    window.scrollTo(0,70);
    this.UnAtelier.push(atelier);
    console.log(this.UnAtelier);
    this.showModal2 = !this.showModal2;
    return this.UnAtelier;
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.ateliercrudservice.uploadFile(file).then((url: string) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  onUploadFile1(file: File) {
    this.fileIsUploading1 = true;
    this.ateliercrudservice.uploadFile1(file).then((url: string) => {
      this.fileUrl1 = url;
      this.fileIsUploading1 = false;
      this.fileUploaded1 = true;
    });
  }


  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  detectFiles1(event) {
    this.onUploadFile1(event.target.files[0]);
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

    });
  }

  initForm() {
    this.atelierForm = this.fb.group({
      titre: ["", Validators.required],
      usersEnrroll: ["" ],
      photo: ["", Validators.required],
      corps: ["", Validators.required],
      etablissement: ["", Validators.required],
      zone: ["", Validators.required],
      video: ["",],
      dateCreation: [
        { value: this.datime, disabled: true },
        Validators.required,
      ],
      user: [{ value: this.user, disabled: true }, Validators.required],
      mail: [{ value: this.mailcurrent, disabled: true }, Validators.required],
    });
  }
  reset() {
    this.atelierForm.reset({
      titre: "",
      photo: "",
      corps: "",
      video: "",
    });
    this.fileUploaded = false;
    this.fileUploaded1 = false;
  }

  isEnroll(atelier:any) {
    this.getAtelier(atelier);
    alert(atelier.usersEnrolling);
  }

  onSaveAtelier() {
    let titre = this.atelierForm.get("titre").value;
    let usersEnrolling =this.mailcurrent;
    let photo = this.atelierForm.get("photo").value;
    let corps = this.atelierForm.get("corps").value;
    let etablissement = this.atelierForm.get("etablissement").value;
    let zone = this.atelierForm.get("zone").value;
    let video = this.atelierForm.get("video").value;
    let dateCreation = this.atelierForm.get("dateCreation").value;
    let username = this.user;
    let mail = this.mailcurrent;
    let newAtelier= new Atelier(
      titre,
      photo,
      corps,
      video,
      dateCreation,
      usersEnrolling,
      etablissement,
      zone,
    );
    let data = {
      titre,
      photo,
      corps,
      video,
      dateCreation,
      username,
      mail,
      usersEnrolling,
      etablissement,
      zone,
    };
    if (this.fileUrl && this.fileUrl !== "") {
      newAtelier.photo = this.fileUrl;
    }
    if (this.fileUrl && this.fileUrl !== "") {
      data.photo = this.fileUrl;
    }
    if (this.fileUrl1 && this.fileUrl1 !== "") {
      newAtelier.video = this.fileUrl1;
    }
    if (this.fileUrl1 && this.fileUrl1 !== "") {
      data.video = this.fileUrl1;
    }
    // this.annonceService.createNewMarchandise(newMarchandise);
    this.ateliercrudservice
      .createNewAtelier(data)
      .then((res) => {
      // this.router.navigate(["/landing"]);
      })
      .catch((error) => {
        this.errormessage = error;
      });
     this.fileUploaded = false;
    this.fileUploaded1 = false;
    this.atelierForm.reset();
    this.showModal = !this.showModal;
  }

  onDeleteAtelier(id: any, idp: any, idv: any) {
    if(confirm("voulez vous supprimer ce fichier de façon permanente.\n Taper: \n        - Ok pour confirmer et continuer \n        - Annuler pour fermer ")){
      this.ateliercrudservice.deleteatelier(id, idp,idv);
    }else{
      window.scrollTo(0,0);
    }

  }

  getAteliervideo(atelier: any) {
    this.UnAtelier.push(atelier);
    this.showModal2 = !this.showModal2;
    window.scrollTo(0, 100);
  }

  onEditAtelier() {
    alert("en cours de traitement ...");
  }

}
