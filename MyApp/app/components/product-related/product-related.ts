import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { Store }                  from '../../providers/store/store';

/*
  Generated class for the ProductRelated component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-related',
  templateUrl: 'build/components/product-related/product-related.html',
  providers: [Store]
})
export class ProductRelated  implements OnInit {

  catName:string;
  relatedProduct: any[];
  total:any = '0';

  @Input()  categoriesInput:  string;
  @Output() onToggle:         EventEmitter<any>   = new EventEmitter();
  @Output() onRelated:        EventEmitter<any>   = new EventEmitter();

  constructor( private _st: Store ) {
    this.relatedProduct = [];
  }

  loadData(){
    let categorieData = this._st.getCategorieData(this.catName)
    if(categorieData == null){
      this.relatedProduct = [];
      this.total = 0
    }
    else {
      categorieData
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
            //console.log(this.relatedProduct)
          }
        )
    }


  }

  onClickRelated(event,id){
     this.onRelated.emit({ event:event, id: id })
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
