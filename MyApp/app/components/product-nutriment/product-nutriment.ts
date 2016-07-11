import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

/*
  Generated class for the ProductNutriment component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-nutriment',
  templateUrl: 'build/components/product-nutriment/product-nutriment.html'
})
export class ProductNutriment implements OnInit{

  energy_100g:number;

  @Input() nutrimentsInput:any;
  @Output() onToggle: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  getWidth(data){
    return Math.round((data)).toString() + '%'
  }

  onClickToggle(e){
     this.onToggle.emit(e)
  }

  ngOnInit(){
    this.energy_100g = Math.round((this.nutrimentsInput.energy_100g * 0.2388))
  }
}
