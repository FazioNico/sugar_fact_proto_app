import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

import { ApiService } from '../api-service/api-service';
import { LocalStorageService } from '../local-storage/local-storage';

/*
  Generated class for the Store provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Store implements OnInit{
  data:     any;
  ls_data:  any;

  constructor(
    private _api    : ApiService,
    private _ls     : LocalStorageService
  ){
    //this.getDataLS()
  }

  /*** call Methode ***/
  getData(value){
    let dataLS = this.getDataLS()
    let dataAPI = this.getDataAPI(value)
    console.log('from dataLS =>')
    console.log(dataLS)
    console.log('from dataAPI =>')
    console.log(dataAPI)
    return dataAPI;
  }

  getProductData(value){
    return this.getProductDataAPI(value);
  }

  getCategorieData(value){
    return this.getCategorieDataAPI(value)
  }
  /*** ########################## ***/

  /*** Food API Methode ***/
  getDataAPI(value){
    return this._api.getData(value)
        .map(
          (data) => {
            this.data = data.products
            return data.products
          }
        )
  }
  getProductDataAPI(value){
    return this._api.getProductData(value);
  }
  getCategorieDataAPI(value){
    return this._api.getCategorieData(value)
  }

  /*** LocalStorageService Methode ***/
  getDataLS(){
    // load data from _ls & affect to ls_data
    return this._ls.get('products_data')

          .then(
            (data) => {
              return JSON.parse(data)
            }
          )

      /*

      .then(
        (data) => {
          this.ls_data = JSON.parse(data)
        }
      )
      .then(
        () => console.log(this.ls_data)
      )
      */
  }


  ngOnInit(){
  }

}
