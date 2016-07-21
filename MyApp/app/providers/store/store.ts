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
  ls_data:  any;

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
      dataReady =  this.dataToObservable(dataLS, value)
    }
    return dataReady;
  };

  dataToObservable(dataLS, value){
    let promise = dataLS
      .then(
      (data) => {
        let test =  _.filter(data,{ 'product_name': value })
        return test
      }
    )
    let source = fromPromise(promise)
    return source
  }

  getProductData(value){
    if(this.online == true){
      return this.getProductDataAPI(value);
    }
    else {
      return this.getProductDataAPI(value);
    }
  }

  getCategorieData(value){
    return this.getCategorieDataAPI(value)
  }
  /*** ########################## ***/

  /*** Food API Methode ***/
  getDataAPI(value){
    console.log('http consect')
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
