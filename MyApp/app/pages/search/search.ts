import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
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
  providers: [[Store],[LocalStorageService]]
})
export class SearchPage {

  searchResultData: any;

  constructor(
    private nav   : NavController,
    private _st   : Store,
    private _ls   : LocalStorageService
  ){
  }

  onInutChange(searchDataInput){
    if (<number>searchDataInput.value.length < 3){
      return;
    }
    if (isNaN(searchDataInput.value) === true){
      /** query string **/
      this._st.getData(searchDataInput.value)
          .subscribe(
            (data) => {
              this._st.data = data
              this.searchResultData = data
              console.log(data)
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
              }
              else {
                this.searchResultData = []
              }
            }
          )
    }
  }
}
