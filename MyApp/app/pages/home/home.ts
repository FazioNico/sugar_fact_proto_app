import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Routes} from '../../providers/routes/routes'


@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [[NavController], [Routes]];
  }
  constructor(public nav: NavController, private routes:Routes) {
  }

  goSearch(){
    this.nav.push(this.routes.getPage(this.routes.SEARCH))
  }

  goScan(){
    this.nav.push(this.routes.getPage(this.routes.SCAN))
  }
}
