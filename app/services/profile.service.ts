import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  profileRef: AngularFirestoreCollection<Profile>;
  profiles: Observable<any>;
  profileDoc: AngularFirestoreDocument<Profile>;
  isLoggedIn = false;

  constructor(private router: Router, public afs: AngularFirestore) {
    // this.profiles = this.afAuth.collection('profiles').valueChanges();
    this.profileRef = this.afs.collection('profiles', ref => ref.orderBy('name', 'asc'));
    this.profiles = this.profileRef.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Profile;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getProfile(id: string): Observable<Profile> {
    const productsDocuments = this.profileRef.doc<Profile>('profiles' + id);
    return productsDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  createProfile(profile: Profile) {
    this.profileRef.add(profile)

  }


  updatePorfile(id: string, value: any): Promise<void> {
    return this.profileRef.doc(id).update(value)
  }


  deleteProfile(profile: Profile) {
    this.profileDoc = this.afs.doc(`profiles/${profile.id}`);
    this.profileDoc.delete();
  }

  getProfiles() {
    return this.profiles;
  }

}


