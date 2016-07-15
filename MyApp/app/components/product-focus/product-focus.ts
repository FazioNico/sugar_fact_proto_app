import { Component, Input }   from '@angular/core';

import { Sugar }              from '../sugar/sugar';

/*
  Generated class for the ProductFocus component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

@Component({
  selector: 'product-focus',
  templateUrl: 'build/components/product-focus/product-focus.html',
  directives: [Sugar]
})
export class ProductFocus {

  sugar_100g:number;
  focusTab: string;

  @Input() productFocusInput: any[];

  constructor(
  ) {
    this.focusTab = "sugar";
  }

  calculeSugar(){
    if(!this.productFocusInput[0].sugars_100){
      this.sugar_100g = this.productFocusInput[0].carbohydrates_100
    }
    else {
      this.sugar_100g = this.productFocusInput[0].sugars_100
    }
    //console.log(this.sugar_100g)
    //console.log('calcule')
  }

  ngOnInit() {
    //console.log('init')
    this.calculeSugar()
  }

}
