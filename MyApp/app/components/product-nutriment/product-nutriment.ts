import { Component, Input } from '@angular/core';

/*
  Generated class for the ProductNutriment component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-nutriment',
  templateUrl: 'build/components/product-nutriment/product-nutriment.html'
})
export class ProductNutriment {

  arrayOfKeys:any[];

  @Input() nutrimentsInput:any[];

  constructor() {
  }

}
