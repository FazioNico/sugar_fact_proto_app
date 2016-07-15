import { Injectable}         from '@angular/core';

import { HomePage }           from '../../pages/home/home';
import { ScanPage }           from '../../pages/scan/scan';
import { SearchPage }         from '../../pages/search/search';
import { ProductPage }        from '../../pages/product/product';
import { AddPage }            from '../../pages/add/add';

@Injectable()
export class Routes {

  routes:Object               = {}
  HOME: string                = "home"
  SCAN: string                = "scan"
  SEARCH: string              = "search"
  PRODUCT: string             = "product"
  ADD: string                 = "add"

  constructor(){

    this.routes[this.HOME]    = HomePage
    this.routes[this.SCAN]    = ScanPage
    this.routes[this.SEARCH]  = SearchPage
    this.routes[this.PRODUCT] = ProductPage
    this.routes[this.ADD]     = AddPage

  }

  getPage(id){
    const   route = this.routes[id]
    return  route
  }

  getRootPage(){
    //let   root = (this.auth.authenticated()) ? this.getPage(this.TABS) : this.getPage(this.HOME)
    let     root = this.getPage(this.HOME)
    return  root
  }

}
