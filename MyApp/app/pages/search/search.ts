import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Routes} from '../../providers/routes/routes'
import { LocalStorageService } from '../../providers/local-storage/local-storage';
import { Store } from '../../providers/store/store';

import { HeaderContent } from '../../components/header-content/header-content';
import { SearchResult } from '../../components/search-result/search-result';

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
    [Store],,
    [LocalStorageService]
  ]
})
export class SearchPage {

  searchResultData: any;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [[NavController], [Routes], [Store], [LocalStorageService]];
  }

  constructor(
    private nav     : NavController,
    private routes  : Routes,
    private _st     : Store,
    private _ls     : LocalStorageService
  ){
  }
  /** Core Methode **/

  /** Events Methode **/
  onInutChange(searchDataInput){
    if (<number>searchDataInput.value.length < 3) return;
    if (isNaN(searchDataInput.value) === true){
      /** query string **/
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
                this.nav.push(this.routes.getPage(this.routes.PRODUCT), { id: 'inconnu' })
              }
            }
          )
    }
    else {
      /** query number **/
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
                this.nav.push(this.routes.getPage(this.routes.PRODUCT), { id: searchDataInput.value })
              }
            }
          )
    }
  }

  onGoProduct(event,id){
    console.log('event emited')
    console.log(event.id)
    //this.nav.pop()
    this.nav.push(this.routes.getPage(this.routes.PRODUCT), { id: event.id })
    .then(
      response => {
        console.log('Response ' + response);
      },
      error => {
        console.log('Error: ' + error);
      }
    ).catch(exception => {
      console.log('Exception ' + exception);
    });
  }

}
