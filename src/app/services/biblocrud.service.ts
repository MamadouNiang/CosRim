import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BiblocrudService {

  contenus: any;

  constructor(public fireservice: AngularFirestore) {}

  createNewContenus(data: any) {
    return this.fireservice.collection("contenus").add(data);
  }

  updateContenus(id, contenus) {
    this.fireservice.doc("contenus/" + id).update(contenus);
  }

  getAllContenus() {
    return this.fireservice.collection("contenus").snapshotChanges();
  }

  deleteContenus(id:any,idC:any) {
    // console.log(id, " idp", idp, "ipv", idp);
    if (idC) {
      const storageRef1 = firebase.storage().refFromURL(idC);
      storageRef1.delete().then(
        () => {
          console.log("Contenus suprimeé!", idC);
        },
        (error) => {
          console.log("Impossible de supprimer le contenus! : " + error);
        }
      );
    }
    this.fireservice.doc("contenus/" + id).delete();
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("contenus/" + almostUniqueFileName + file.name)
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
