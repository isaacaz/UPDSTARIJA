import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn as QueryFnRealtime } from '@angular/fire/database';
import { map, first } from 'rxjs/operators';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public rtDB: AngularFireDatabase, public firestore: AngularFirestore) { }
  public getRealTimeDBQueryPromise(path: string, query: QueryFnRealtime): Promise<any> {
    return new Promise((resolve, reject) => {
      this.rtDB.list(path, query).snapshotChanges().pipe(first()).pipe(map(data => data.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe((d:Array<any>) => {
        resolve(d)
      }, err => reject(err));
    })
  }
  public getRealTimeDBQuery(path: string, query: QueryFnRealtime) {
    return this.rtDB.list(path, query).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.key, ...c.payload.val() } as any))));
  }
  public getRealTimeDBObject(path: string) {
    return this.rtDB.object(path).snapshotChanges().pipe(map(c => {
      return { key: c.payload.key, ...c.payload.val() };
    }));
  }
  public getRealTimeDBObjectPromise(path: string) {
    return this.rtDB.object(path).snapshotChanges().pipe(map(c => {
      return { key: c.payload.key, ...c.payload.val() };
    })).pipe(first()).toPromise();
  }
  public getRealTimeDBValue(path: string) {
    return this.rtDB.object(path).snapshotChanges().pipe(map(c => {
      return { key: c.payload.key, value:c.payload.val() };
    }));
  }
  public getRealTimeDBString(path: string){
    return this.rtDB.object(path).snapshotChanges().pipe(map(c => {
      return { key: c.payload.key, text: c.payload.val() };
    }));
  }
  public getRealTimeDBList(path: string, ){
    return this.rtDB.list(path).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
  }
  public getRealTimeDBListNumbers(path: string, ){
    return this.rtDB.list(path).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.key,value: c.payload.val() }))))
  }
  public getRealTimeDBListPromise(path: string, ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.rtDB.list(path).snapshotChanges().pipe(first()).pipe(map(data => data.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(d => {
        resolve(d)
      }, err => reject(err));
    })
  }
  setRealTimeObject(path, data) {
    return this.rtDB.object(path).set(data);
  }
  pushRealTimeObject(path, data) {
    let key = this.rtDB.createPushId();
    return new Promise((resolve, reject) => {
      this.rtDB.object(path + '/' + key).set(data).then(() => {
        resolve(key);
      });
    });
  }
  updateRealTimeObject(path, data) {
    return this.rtDB.object(path).update(data);
  }
  setDocument(path, data) {
    return this.firestore.doc(path).set(data);
  }
  addToCollection(path, data) {
    return this.firestore.collection(path).add(data);
  }
  updateDocument(path, data) {
    return this.firestore.doc(path).update(data);
  }
  deleteDocument(path) {
    return this.firestore.doc(path).delete();
  }
  getDocument(path) {
    return this.firestore.doc(path).snapshotChanges().pipe(map((a: any) => {
      return a.payload.data()?{ key: a.payload.id, ...a.payload.data() }:null;
    }))
  }
  getDocumentPromise(path) {
    return this.firestore.doc(path).snapshotChanges().pipe(map((a: any) => {
      return a.payload.data()?{ key: a.payload.id, ...a.payload.data() }:null;
    })).pipe(first()).toPromise();
  }
  getTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
  getCustomTimestamp(date: Date){
    return firebase.firestore.Timestamp.fromDate(date);
  }
  getTimestampRTDB() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  loadGeoPoint(lat: number, lng: number) {
    return new firebase.firestore.GeoPoint(lat, lng);
  }
  public getCollection(path: string) {
    return this.firestore.collection(path).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))));
  }
  public getCollectionPromise(path: string) {
    return this.firestore.collection(path).snapshotChanges().pipe(first()).pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))).toPromise();
  }
  getCollectionsQuery(path: string, query: QueryFn) {
    return this.firestore.collection(path, query).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))));
  }
  getCollectionsQueryPromise(path: string, query: QueryFn) {
    return this.firestore.collection(path, query).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))).pipe(first()).toPromise();
  }
  getCollectionGroup(collectionID:string,query: QueryFn){
    return this.firestore.collectionGroup(collectionID, query).snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))).pipe(first()).toPromise();
  }
}
