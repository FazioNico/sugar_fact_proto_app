
import { Injectable, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {fromPromise} from 'rxjs/observable/fromPromise';

import { ApiService } from '../api-service/api-service';
import { LocalStorageService } from '../local-storage/local-storage';

import * as _ from 'lodash';

/*
  Generated class for the Store provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Store implements OnInit{
  data:     any;
  ls_data:  any;

  dataAPI:any;
  dataLS:any;

  constructor(
    private _api    : ApiService,
    private _ls     : LocalStorageService
  ){
    //this.getDataLS()
    //console.log(this.getDataLS())
  }

  /*** call Methode ***/
  getData(value){
    let Online = false;
    let dataReady;
    //// get data LS
    let dataLS = this.getDataLS() //console.log(dataLS)

    if(Online == true){
      //// get data API
      let dataAPI = this.getDataAPI(value)  //console.log(dataAPI)
      //// combin data & save to LS
      this.setDataToCombine(dataAPI,dataLS)
      //// return data API
      dataReady = dataAPI;
    }
    else {
      dataReady =  this.dataToObservable(dataLS, value)
    }
    return dataReady
  }

  dataToObservable(dataLS, value){
    let promose = dataLS
      .then(
      (data) => {
        let test =  _.filter(data,{ 'product_name': value })
        return test
      }
    )
    let source = fromPromise(promose)
    return source
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

  setDataToCombine(ObservableDataAPI,PromiseDataLS){
    return PromiseDataLS.then(
      (data) => this.dataLS = data
    )
    .then(
      () => {
        // now dataLS Loaded then load dataAPI
        return ObservableDataAPI.subscribe(
          (res) => this.dataAPI = (res),
          (err) => console.log(err),
          () => {
            console.log('now have all data')
            let dataCombined = _.unionWith(this.dataLS, this.dataAPI, _.isEqual);
            console.log(dataCombined)
            this.setDataLS(dataCombined)
            return dataCombined
          }
        )

      }
    )
  }


  /*** LocalStorageService Methode ***/
  returnDataLS(){
    // return data 'formated' with api search

  }
  getDataLS(){
    // return data from _ls
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
  }

  setDataLS(dataArray){
    // remove old data LS
    this.removeDataLS()
    // save caoncat data to LS
    this._ls.set('products_data', JSON.stringify(dataArray))
    console.log('data stored !')
  }

  removeDataLS(){
      this._ls.remove('products_data')
  }

  ngOnInit(){
  }

}
