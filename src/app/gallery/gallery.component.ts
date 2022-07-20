import { Component, OnInit } from '@angular/core';
import { UploadGallery } from '../models/upload';
import { UploadserviceService } from '../services/uploadservice.service';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { UserCrudService } from '../services/user-crud.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  infoUser :any;
  roleadmin = 'administrateur';
  files: FileList;
  upload: UploadGallery;
  images = [];
  user: any;
  mailcurrent = "";
  userT: "";
  gallery: any;


  constructor(private uploadService: UploadserviceService, public authService: AuthService,
      public userService: UserCrudService,
  ) { }

  getAllGallery() {
    return this.uploadService.ListePhotos();
  }

  hanldeFiles(event) {
    this.files  = event.target.files;
  }

  uploadFiles() {
    if(confirm("Veuillez vous Ajouter des images dans la gallerie.\n Taper: \n        - Ok pour ajouter et continuer \n        - Annuler pour fermer ")){
      const filesToUpload = this.files;
      const filesidx = _.range(filesToUpload.length);
      _.each(filesidx, (idx) => {
        // console.log(filesToUpload[idx]);
        this.upload = new UploadGallery(filesToUpload[idx])
        this.uploadService.uploadFile(this.upload);
      });
    } else {
      window.scrollTo(0,0);
    }



    // const filesidx = _.range(filesToUpload.length);
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
        console.log(this.authService.currentUserName );

        if (this.authService.currentUserName === this.user[i].emailF) {
          let usert = this.user[i].userTypeF;
          let mailF = this.user[i].emailF;
          this.user = this.user[i].nomPrenom;
          this.userT = usert;
          this.mailcurrent = mailF;
        }
      }

    });
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.currentUser();
    this.infoUser = this.authService.currentUser;
    this.images.push(this.getAllGallery())
    console.log(this.images);
    // console.log(this.gallery);
    // this.images = this.uploadService.ListePhotos();
    // alert(this.images);

  }


}
