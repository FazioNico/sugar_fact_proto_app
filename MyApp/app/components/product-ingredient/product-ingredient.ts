import { Component, Input, OnInit } from '@angular/core';

/*
  Generated class for the ProductIngredient component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-ingredient',
  templateUrl: 'build/components/product-ingredient/product-ingredient.html'
})
export class ProductIngredient implements OnInit{

  total:any;
  @Input() ingredientsInput: any[];

  constructor() {
  }

  ngOnInit(){
    this.total = this.ingredientsInput.length
  }
}
