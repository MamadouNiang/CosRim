import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IndexServiceService {

  constructor(public fireservice: AngularFirestore) { }
  createNewAnnonce(data: any) {
    return this.fireservice.collection("index").add(data);
  }

  updateAnonce(id, annonce) {
    this.fireservice.doc("index/" + id).update(annonce);
  }

  getAllAnnonces() {
    return this.fireservice.collection("index").snapshotChanges();
  }

  deleteAnnonce(id) {
    this.fireservice.doc("index/" + id).delete();
  }
}
