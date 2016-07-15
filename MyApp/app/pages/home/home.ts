import { Component, ViewChild }  from '@angular/core';
import { NavController }         from 'ionic-angular';

import { Routes }                from '../../providers/routes/routes'
import { ScanPage }              from '../scan/scan';


@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [ScanPage]
})
export class HomePage {

  private scanPlugin: ScanPage;

  @ViewChild(ScanPage)

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [[NavController], [Routes]];
  }
  constructor(
    public nav: NavController,
    private routes:Routes
  ) {
  }

  goSearch(){
    this.nav.push(this.routes.getPage(this.routes.SEARCH))
  }

  goScan(){
    this.scanPlugin.scan()
  }
}
