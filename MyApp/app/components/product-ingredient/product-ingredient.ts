import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

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
  @Output() onToggle: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  onClickToggle(e){
     this.onToggle.emit(e)
  }

  ngOnInit(){
    this.total = this.ingredientsInput.length
  }
}
