import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { ApiService } from '../../providers/api-service/api-service';

/*
  Generated class for the ProductRelated component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-related',
  templateUrl: 'build/components/product-related/product-related.html',
  providers: [ApiService]
})
export class ProductRelated  implements OnInit {

  catName:string;
  relatedProduct: any[];
  total:any = '0';

  @Input() categoriesInput: string;
  @Output() onToggle: EventEmitter<any> = new EventEmitter();

  constructor( public apiService: ApiService ) {
    this.relatedProduct = [];
  }

  loadData(){
    this.apiService.getCategorieData(this.catName)
      .subscribe(
        (data) => {
          let result = data.count
          if(result >= 1){
            this.relatedProduct = data.products
          }
          else {
            this.relatedProduct = [];
          }
        },
        (error) => this.relatedProduct = [],
        () => {
          this.total = this.relatedProduct.length
          console.log(this.relatedProduct)
        }
      )

  }

  onClickToggle(e){
     this.onToggle.emit(e)
  }

  ngOnInit() {
    this.catName = this.categoriesInput
    this.loadData()
    console.log(this.categoriesInput)
  }

}
