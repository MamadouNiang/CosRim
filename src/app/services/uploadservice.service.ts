import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadGallery } from '../models/upload';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {

  images = [];
  images2 = [];
  uploadFile(file: UploadGallery) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("image/" + almostUniqueFileName +file.file.name)
        .put(file.file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          file.progress = (upload.snapshot.bytesTransferred / upload.snapshot.totalBytes) * 100;
          file.name = file.file.name;
          console.log("Chargement…" + file.progress);
          if (file.progress == 100) {
            window.location.reload();
          }
        },
        (error) => {
          console.log("Erreur de chargement ! : " + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }

  ListePhotos() {
    let datas=[];
    var listRef = firebase.storage().ref().child('image');

          // Find all the prefixes and items.
      listRef.listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // console.log(folderRef.fullPath)
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {

          // All the items under listRef.
          (itemRef.getDownloadURL().then(data => {
            datas.push(data);
          }));
        });
        // console.log(this.images);
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
    // console.log(datas);
    return datas;
  }



  constructor(public fireservice: AngularFirestore) { }


}
