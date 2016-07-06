import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';

import { SearchResult } from '../../components/search-result/search-result';

/*
  Generated class for the SearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/search/search.html',
  directives: [SearchResult]
})
export class SearchPage {
  searchResultData: any;

  constructor(private nav: NavController,private apiService: ApiService) {

  }


  getKeyUp(searchDataInput){
    if (<number>searchDataInput.value.length < 3){
      return;
    }

    if (isNaN(searchDataInput.value) === true){
      console.log('string')
      this.apiService
        .getData(searchDataInput.value)
        .subscribe(
          (data) => this.searchResultData = data.products
        )
    }
    else {
      console.log('number')
      this.apiService
        .getProductData(searchDataInput.value)
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
    console.log(this.searchResultData)
  }
}
