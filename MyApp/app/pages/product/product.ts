import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

import { ApiService } from '../../providers/api-service/api-service';

import { HeaderContent } from '../../components/header-content/header-content';
import { ProductHeader } from '../../components/product-header/product-header';
import { ProductFocus } from '../../components/product-focus/product-focus';
import { ProductNutriment } from '../../components/product-nutriment/product-nutriment';
import { ProductIngredient } from '../../components/product-ingredient/product-ingredient';
import { ProductAdditive } from '../../components/product-additive/product-additive';
import { ProductRelated } from '../../components/product-related/product-related';
import { ProductNotfound } from '../../components/product-notfound/product-notfound';

import { AddPage } from '../add/add';
/*
  Generated class for the ProductPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/product/product.html',
  directives: [
    HeaderContent,
    ProductHeader,
    ProductFocus,
    ProductNutriment,
    ProductIngredient,
    ProductAdditive,
    ProductRelated,
    ProductNotfound
  ],
  providers: [ApiService]
})
export class ProductPage {

  result: any;
  productID:string;
  productData:any;
  focusData:any[];
  nutriments:any;
  ingredients:any;
  additives_tags:any;
  categories_hierarchy:any;

  @ViewChild(Content)       content       : Content;
  @ViewChild(ProductFocus)  productFocus  : ProductFocus;


  constructor(
    public apiService   : ApiService,
    private nav         : NavController,
    private params      : NavParams
  ) {

      this.getData(this.params.get('id'))
      console.log(this.params.get('id'))
  }

  /** Core Methode **/
  getData(barcode){
    this.productID = barcode;
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
    console.log(this.productData)
    if(this.productData != false){

      this.nutriments       = this.productData.nutriments
      this.ingredients      = this.productData.ingredients
      this.additives_tags   = this.productData.additives_tags

      if(this.productData.categories_hierarchy[0].length >1){
        this.categories_hierarchy = this.productData.categories_hierarchy.reverse()[0].split(':')[1]
      }
      else {
        this.categories_hierarchy  = []
      }

      this.focusData    = [];
      this.focusData.push({

        sugars_100:         this.productData.nutriments.sugars_100g,
        carbohydrates_100:  this.productData.nutriments.carbohydrates_100g,
        fat_100:            this.productData.nutriments.fat_100g,
        sugar_portion:      this.productData.nutriments.sugars_serving,
        fat_portion:        this.productData.nutriments.fat_serving

      })
    }
    //this.productFocus.calculeSugar()
  }

  /** Events Methode **/
  onClickToggle(e){
    let el = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")
  }

  onClickRelated(e){
    console.log(e.target.offsetParent.id)
    let param = e.target.offsetParent.id
    this.productID = param;
    this.getData(param)
    this.content.scrollToTop();
    this.productFocus.calculeSugar()
    // close all accordeon
    let acc = document.getElementsByClassName('open')
    let btn = document.getElementsByClassName('rotate')
    console.log(acc)
    for (let i = 0; i < acc.length; i++) {
        acc[i].classList.toggle("open");
        btn[i].classList.toggle("rotate");
    }
  }

  onClickAdd(){
    this.nav.push(AddPage)
  }

  onClickBack(){
    this.nav.pop()
  }

}
