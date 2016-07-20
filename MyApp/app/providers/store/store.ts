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
    console.log(this.getDataLS())
  }

  /*** call Methode ***/
  getData(value){
    let del = this.removeDataLS()
    let dataLS = this.getDataLS()
    let dataAPI = this.getDataAPI(value)

    let updatDataLS = this.setDataLS(dataAPI)
    console.log(updatDataLS)
    console.log('from dataAPI =>')
    console.log(dataAPI)

    /*
    if(Online == true){
      let updatDataLS = this.setDataLS(dataAPI)
      console.log(updatDataLS)
      console.log('from dataAPI =>')
      console.log(dataAPI)
      return dataAPI
    }
    else {
      console.log('from dataLS =>')
      console.log(dataLS)
      return dataLS
    }
    */
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
  returnDataLS(){
    // return data 'formated' with api search

  }
  getDataLS(){
    // load data from _ls & affect to ls_data
    return this._ls.get('products_data')

          .then(
            (data) => {
              if (data){
                return JSON.parse(data)
              }
              else {
                return []
              }

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

  setDataLS(ObservableDataAPI){

      return ObservableDataAPI.subscribe(
        (res) => {
          console.log(res)
          this._ls.set('products_data', JSON.stringify(res))
        },
        (err) => {
            console.log(err)
        }
      )
      //console.log(dataTest)
      //return dataTest
      //return this._ls.set('products_data', JSON.stringify(value))
  }

  removeDataLS(){
      return this._ls.remove('products_data')
  }

  ngOnInit(){
  }

}
