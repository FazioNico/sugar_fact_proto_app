import { Injectable } from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the LocalStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalStorageService {
  data:any        = null;
  local:Storage   = new Storage(LocalStorage);

  constructor() {
    //this.getData()
  }

  /** Get mehtode **/
  get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let value = this.local.get(key);
        resolve(value);
      } catch (e) {
        reject(e);
      }
    });
  }


  /** Set Methode **/
  set(key: string, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.local.set(key, value);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  remove(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.local.remove(key);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  addData(data){
    this.data.push(JSON.stringify(data))
    this.setLocal()
  }

  setLocal() {
    this.local.set('products_data', this.data);
  }

  /*** BOf - test ***

  initLocalStorage() {

   return new Promise((resolve, reject) => {
     this.local.get("products_data").then((productsData) => {
       resolve(productsData => {console.log(productsData)});
     }).catch( error => {
       reject(error);
     })
   });
  }

  observableLS(){
    return Observable.create(observer => {
        observer.next(this.initLocalStorage());
        observer.complete();
    });
  }
   *** Eof - test ***/
}
