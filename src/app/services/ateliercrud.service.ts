import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AteliercrudService {

  photo: any;
  constructor(public fireservice: AngularFirestore) {}

  createNewAtelier(data: any) {
    return this.fireservice.collection("ateliers").add(data);
  }

  updateAtelier(id, atelier) {
    this.fireservice.doc("ateliers/" + id).update(atelier);
  }

  getAllAteliers() {
    return this.fireservice.collection("ateliers").snapshotChanges();
  }

  deleteatelier(id, idp,idv) {
    console.log(id, " idp", idp, "ipv", idp);
    if (idp && idv) {
      const storageRef = firebase.storage().refFromURL(idp);
      const storageRef1 = firebase.storage().refFromURL(idv);
      storageRef.delete().then(
        () => {
          console.log("Photo suprimeé!", id);
        },
        (error) => {
          console.log("Impossible de supprimer la photo! : " + error);
        }
      );
      storageRef1.delete().then(
        () => {
          console.log("Video suprimeé!", id);
        },
        (error) => {
          console.log("Impossible de supprimer Video! : " + error);
        }
      );
    }
    this.fireservice.doc("ateliers/" + id).delete();
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("images/" + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("Chargement…");
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

  uploadFile1(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("video/" + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("Chargement…");
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
}
