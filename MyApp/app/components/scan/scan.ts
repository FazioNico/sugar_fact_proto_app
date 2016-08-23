import { Component } from '@angular/core';
import {BarcodeScanner}           from 'ionic-native';

import {Routes}                   from '../../providers/routes/routes'
/*
  Generated class for the Scan component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'scan-plug',
  templateUrl: 'build/components/scan/scan.html'
})
export class Scan {

  barcodeData: BarcodeData;
  scanDetails:any;

  constructor(

  ) {
    //this.scanCode()
  }


  scanCode() {
    return BarcodeScanner.scan()
    .then((result) => {
      if (!result.cancelled) {
        const barcodeData = new BarcodeData(result.text, result.format);
        //return this.goScanDetails(barcodeData);
        return barcodeData;
        /** to check in template: **/
        //this.scanDetails = barcodeData;
      }
    })
    .catch((err) => {
      alert(err);
    })
  }

  goScanDetails(datacode){
      let param = datacode.text
      return param
      //this.nav.push(this.routes.getPage(this.routes.PRODUCT), { id: param });
  }

}

export class BarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}
}