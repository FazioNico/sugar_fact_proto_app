/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 22-07-2016
*/

import { Component }              from '@angular/core';
import { NavController, Loading } from 'ionic-angular';

import { Routes }                 from '../../providers/routes/routes'
import { Store }                  from '../../providers/store/store';

import { HeaderContent }          from '../../components/header-content/header-content';
import { SearchResult }           from '../../components/search-result/search-result';

/*
  Generated class for the SearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/search/search.html',
  directives: [
    HeaderContent,
    SearchResult
  ],
  providers: [
    [Store]
  ]
})
export class SearchPage {

  searchResultData: any;
  loading:Loading;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [[NavController], [Routes], [Store]];
  }

  constructor(
    private nav     : NavController,
    private routes  : Routes,
    private _st     : Store
  ){
    this.loading;
  }

  /** Core Methode **/
  private hideLoading(){
    this.loading.dismiss();
  }

  private queryString(searchDataInput) {
    this._st.getData(searchDataInput.value)
        .subscribe(
          (data) => {
            this._st.data = data
            this.searchResultData = data
          },
          (err) => {
            console.log(err)
          },
          () => {
            if(Object.keys(this.searchResultData).length == 0) {
              this.nav.push(
                this.routes.getPage(this.routes.PRODUCT),
                { id: 'inconnu' }
              );
            }
          }
        );
  }

  private queryNumber(searchDataInput) {
    this._st.getProductData(searchDataInput.value)
        .subscribe(
          (data) => {
            if(data.status === 1){
              this.searchResultData = []
              this.searchResultData.push(data.product)
              //console.log(data.product)
            }
            else {
              this.searchResultData = []
              this.nav.push(
                this.routes.getPage(this.routes.PRODUCT),
                { id: searchDataInput.value }
              );
            }
          }
        );
  }
  /** Events Methode **/
  onInutChange(searchDataInput){
    if (<number>searchDataInput.value.length < 3) return;
    if (isNaN(searchDataInput.value) === true){
        /** query is a string **/
        this.queryString(searchDataInput)
    }
    else {
        /** query is a number **/
        this.queryNumber(searchDataInput)
    }
  }

  onGoProduct(event,id){
    this.nav.present(this.loading);
    this.nav.push(
      this.routes.getPage(this.routes.PRODUCT),
      { id: event.id }
    );
  }

  /*** Ionic ViewEvent ***/
  ionViewDidLeave(){
    this.hideLoading()
  }

  ionViewDidEnter(){
    this.loading = Loading.create({
      content: "Chargement..."
    });
  }

}
