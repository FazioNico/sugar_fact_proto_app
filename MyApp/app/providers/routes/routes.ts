import { Injectable} from '@angular/core';

import {HomePage} from '../../pages/home/home';
import {ScanPage} from '../../pages/scan/scan';
import {SearchPage} from '../../pages/search/search';
import {ProductDetailPage} from '../../pages/product-detail/product-detail';

@Injectable()
export class Routes {
  routes:Object = {};

  HOME:string="home";
  SCAN:string="scan";
  SEARCH: string="search";
  PRODUCT_DETAIL: string="product_detail";

  constructor(){
    this.routes[this.HOME]=HomePage;
    this.routes[this.SCAN]=ScanPage;
    this.routes[this.SEARCH]=SearchPage;
    this.routes[this.PRODUCT_DETAIL]=ProductDetailPage;
  }

  getPage(id){
    const route = this.routes[id];
    return route;
  }

  getRootPage(){
    //let root = (this.auth.authenticated()) ? this.getPage(this.TABS) : this.getPage(this.HOME)
    let root = this.getPage(this.HOME)
    return root;
  }

}
