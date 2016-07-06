import { Component, Input, OnInit } from '@angular/core';

/*
  Generated class for the ProductAdditive component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-additive',
  templateUrl: 'build/components/product-additive/product-additive.html'
})
export class ProductAdditive implements OnInit{
  additiveData: any[];
  total:any= '0';

  @Input() additiveInput: any[];

  constructor() {
    this.additiveData = [];
  }

  ngOnInit(){
    let data = this.additiveInput
    data.map(
      num => this.additiveData.push(num.split(':')[1])
    )
    this.total = this.additiveData.length
    //console.log(this.additiveData)
  }
}
