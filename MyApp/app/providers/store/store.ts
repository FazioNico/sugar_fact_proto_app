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
    //// get data LS
    let dataLS = this.getDataLS()
        //console.log(dataLS)
    //// get data API
    let dataAPI = this.getDataAPI(value)
        //console.log(dataAPI)
    //// combin data & save to LS
    this.setDataInArray(dataAPI,dataLS)
    //// return data API
    return dataAPI;
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

  setDataInArray(ObservableDataAPI,PromiseDataLS){
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
            console.log([this.dataLS, this.dataAPI])
            this.setDataLS([this.dataLS, this.dataAPI])
            return [this.dataLS, this.dataAPI]
          }
        )

      }
    )

    /*
    let o = ObservableDataAPI.subscribe(
      (res) => this.dataAPI = (res),
      (err) => console.log(err),
      () => {
        console.log(this.dataAPI)
        console.log(this.dataLS)
        return this.dataAPI
      }
    )
    */
    /*
      let dataReady; // Concated
      let dataAPI;
      let dataStored = this.getDataLS()
      return ObservableDataAPI.subscribe(
        (res) => {
          console.log(res)
          //this._ls.set('products_data', JSON.stringify(res))
          //dataSetted = this._ls.preSet('products_data', res)
          dataReady = Object.assign(dataStored, res);
          console.log(dataReady)
        },
        (err) => {
            console.log(err)
        }
      )
    */
      //return dataTest
      //return this._ls.set('products_data', JSON.stringify(value))
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
    // concat Array value
    let data = dataArray[0]
    // save caoncat data to LS
    this._ls.set('products_data', JSON.stringify(data))
    console.log('data stored !')
  }

  removeDataLS(){
      this._ls.remove('products_data')
  }

  ngOnInit(){
  }

}
