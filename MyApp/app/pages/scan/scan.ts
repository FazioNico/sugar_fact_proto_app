import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

import {Routes} from '../../providers/routes/routes'
/*
  Generated class for the ScanPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'scan-plug',
  templateUrl: 'build/pages/scan/scan.html',
})
export class ScanPage {

  barcodeData: BarcodeData;
  scanDetails:any;

  /** Not normally mandatory but create bugs if ommited. **/

  static get parameters() {
      return [[NavController], [Routes]];
  }

  constructor(
    public nav: NavController,
    private routes:Routes
  ) {
    //this.scan()
  }

  scan() {
    BarcodeScanner.scan()
    .then((result) => {
      if (!result.cancelled) {
        const barcodeData = new BarcodeData(result.text, result.format);
        //this.goScanDetails(barcodeData);

        /** to check in template: **/
        this.scanDetails = barcodeData;
      }
    })
    .catch((err) => {
      alert(err);
    })
  }

  goScanDetails(datacode){
      let param = datacode.text
      this.nav.push(this.routes.getPage(this.routes.PRODUCT), { id: param });
  }
}

export class BarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}
}
