/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   13-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 21-07-2016
*/

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

  dataAPI:any;
  dataLS:any;
  online:boolean = true;

  constructor(
    private _api    : ApiService,
    private _ls     : LocalStorageService
  ){

    if(navigator.onLine == false){
      //console.log('disconnected')
      this.online = false
    }
  }

  /*** call Methode ***/
  getData(value){
    let dataReady;
    let dataLS = this.getDataLS()             /** get data LS  **/

    if(this.online == true){
      console.log('online!')
      let dataAPI = this.getDataAPI(value)    /** get data API  **/
      this.setDataToCombine(dataAPI,dataLS)   /** combin data & save to LS  **/
      dataReady = dataAPI                     /** return data API **/
    }
    else {
      console.log('offline!')
      dataReady =  this.dataToObservable(dataLS, 'product_name', value)
    }
    return dataReady;
  };

  getProductData(value){
    if(this.online == true){
      return this.getProductDataAPI(value);
    }
    else {
      return this.getProductDataLS(value);
    }
  }

  getCategorieData(value){
    return this.getCategorieDataAPI(value)
  }

  /*** formationg Method ***/
  dataToObservable(dataLS, key, value){
    let promise = dataLS
      .then(
      (data) => {
        let test =  _.filter(data,{ [key]: value })
        return test
      }
    )
    let source = fromPromise(promise)
    return source
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
            let dataCombined = _.unionWith(this.dataLS, this.dataAPI, _.isEqual);
            this.setDataLS(dataCombined)
            return dataCombined
          }
        )

      }
    )
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

  getProductDataLS(value){
      let dataReady;
      let dataLS = this.getDataLS()             /** get data LS  **/
      dataReady =  this.dataToObservable(dataLS, 'id', value)
      //return this._ls.getProductData(value);
      return dataReady;
  }

  setDataLS(dataArray){
    // remove old data LS
    this.removeDataLS()
    // save concat data to LS
    this._ls.set('products_data', JSON.stringify(dataArray))
  }

  removeDataLS(){
      this._ls.remove('products_data')
  }

  ngOnInit(){
  }

}
