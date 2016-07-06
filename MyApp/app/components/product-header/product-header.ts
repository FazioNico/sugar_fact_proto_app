import { Component, Input } from '@angular/core';

/*
  Generated class for the ProductHeader component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-header',
  templateUrl: 'build/components/product-header/product-header.html'
})
export class ProductHeader {

  @Input() productDataHeaderInput: any[];

  constructor() {
  }
}
