import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from "../../../node_modules/rxjs/Observable.d";

import { ApiService } from '../../providers/api-service/api-service';
import { ProductHeader } from '../../components/product-header/product-header';
import { ProductFocus } from '../../components/product-focus/product-focus';
import { ProductNutriment } from '../../components/product-nutriment/product-nutriment';
import { ProductIngredient } from '../../components/product-ingredient/product-ingredient';
import { ProductAdditive } from '../../components/product-additive/product-additive';
import { ProductRelated } from '../../components/product-related/product-related';

/*
  Generated class for the ProductDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/product-detail/product-detail.html',
  directives: [
    ProductHeader,
    ProductFocus,
    ProductNutriment,
    ProductIngredient,
    ProductAdditive,
    ProductRelated
  ],
  providers: [ApiService]
})
export class ProductDetailPage {

    page:Observable<string>;
    result: any;
    productID:string;
    productData:any;
    focusData:any[];
    nutriments:any;
    ingredients:any;
    additives_tags:any;
    categories_hierarchy:any;

    constructor(
      public apiService: ApiService,
      private nav: NavController,
      private params: NavParams
    ) {
      console.log(this.params.get('id'))

      this.productID = this.params.get('id');
      this.apiService.getProductData(this.productID)
        .subscribe(
          (data) => {
            this.result = data.status
            if(this.result === 1){
              this.productData = data.product
            }
            else {
              this.productData = false;
            }
          },
          (error) => this.productData = false,
          () => this.setData()
        )

    }

    setData(){
      if(this.productData != false){
        this.nutriments = this.productData.nutriments
        this.ingredients = this.productData.ingredients
        this.additives_tags = this.productData.additives_tags
        if(this.productData.categories_hierarchy[0].length >1){
          this.categories_hierarchy  = this.productData.categories_hierarchy.reverse()[0].split(':')[1]
        }
        else {
          this.categories_hierarchy  = []
        }
        this.focusData = [];
        this.focusData.push({
          sugars_100: this.productData.nutriments.sugars_100g,
          carbohydrates_100: this.productData.nutriments.carbohydrates_100g,
          fat_100: this.productData.nutriments.fat_100g
        })
      }
      console.log(this.productData)
    }
}
