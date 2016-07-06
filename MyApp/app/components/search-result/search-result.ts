import { Component, Input } from '@angular/core';
import {NavController} from 'ionic-angular';
import {Routes} from '../../providers/routes/routes'

/*
  Generated class for the SearchResult component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'search-result',
  templateUrl: 'build/components/search-result/search-result.html'
})
export class SearchResult {

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [[NavController], [Routes]];
  }

  constructor(public nav: NavController, private routes:Routes) {
    this.dataInput  = 'default'
  }
  @Input() dataInput : any;

  goProduct(productID) {
    let param = productID
    this.nav.push(this.routes.getPage(this.routes.PRODUCT_DETAIL), { id: param });
  }
}
