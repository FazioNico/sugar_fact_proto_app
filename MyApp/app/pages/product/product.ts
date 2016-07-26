import { Component, ViewChild }               from '@angular/core';
import { NavController, NavParams, Content }  from 'ionic-angular';

import { Store }                              from '../../providers/store/store';

import { HeaderContent }                      from '../../components/header-content/header-content';
import { ProductHeader }                      from '../../components/product-header/product-header';
import { ProductFocus }                       from '../../components/product-focus/product-focus';
import { ProductNutriment }                   from '../../components/product-nutriment/product-nutriment';
import { ProductIngredient }                  from '../../components/product-ingredient/product-ingredient';
import { ProductAdditive }                    from '../../components/product-additive/product-additive';
import { ProductRelated }                     from '../../components/product-related/product-related';
import { ProductNotfound }                    from '../../components/product-notfound/product-notfound';

import { AddPage }                            from '../add/add';
import { UserPage }                            from '../user/user';

import {FirebaseService} from '../../providers/firebase/firebase';
//import { Routes }                            from '../../providers/routes/routes';

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
  providers: [
    Store,
    FirebaseService
  ]
})
export class ProductPage {

  result: any;
  productID:string;
  productData:any;
  productName:string;
  focusData:any[];
  nutriments:any;
  ingredients:any;
  additives_tags:any;
  categories_hierarchy:any;

  titleUnvisible:boolean = true;
  titleH1Unvisible:boolean = false;

  scrollTopValue:any ='0px';
  scrollTopContentValue:any = '268px';

  isAuth:any = false;
  email:string;

  @ViewChild(Content)       content       : Content;
  @ViewChild(ProductFocus)  productFocus  : ProductFocus;


  constructor(
    private _st             : Store,
    private nav             : NavController,
    private params          : NavParams,
    public authData         : FirebaseService
  ) {
      //// Get data with nav parameters
      this.getData(this.params.get('id'))
      //// Check if user Auth == true
      this.authData = authData;
      this.authData.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          this.isAuth = true
          this.email = user.email
        } else {
          this.isAuth = false
        }
      });
  }

  /** Core Methode **/
  getData(barcode){
    this.productID = barcode;
    this._st.getProductData(this.productID)
      .subscribe(
        (data) => {
          if(data.status){
            this.result = data.status
          }
          else {
            this.result = 0
          }
          if(this.result === 1){
            this.productData = data.product
          }
          else {
            /*** no result in API or no internet connection ***/
            if(data.length == 1){
              /*** if data return somthing ***/
              if(data[0].id){
                this.productData = data[0];
                this.result = 1
              }
              else {
                this.productData = false;
              }
            }
            else {
              this.productData = false;
            }
          }
        },
        (error) => this.productData = false,
        () => this.setData()
      )
  }

  setData(){
    //console.log(this.productData)
    if(this.productData != false){
      this.productName      = this.productData.product_name
      this.nutriments       = this.productData.nutriments
      this.ingredients      = this.productData.ingredients
      this.additives_tags   = this.productData.additives_tags;

      if(this.productData.categories_hierarchy.length > 0){
        this.categories_hierarchy = this.productData.categories_hierarchy.reverse()[0].split(':')[1]
      }
      else {
        this.categories_hierarchy  = []
      }

      if(!this.productData.serving_size){
        this.productData.serving_size = 0
      }

      if(!this.productData.serving_quantity){
        this.productData.serving_quantity = 0
      }

      this.focusData    = [];
      this.focusData.push({

        sugars_100:         this.productData.nutriments.sugars_100g,
        carbohydrates_100:  this.productData.nutriments.carbohydrates_100g,
        fat_100:            this.productData.nutriments.fat_100g,
        sugar_portion:      this.productData.nutriments.sugars_serving,
        fat_portion:        this.productData.nutriments.fat_serving,
        serving_quantity:   this.productData.serving_quantity,
        serving_size:       this.productData.serving_size

      })
      //console.log(this.productData)
      //console.log(this.focusData)
    }
    //this.productFocus.calculeSugar()
  }

  /** Events Methode **/
  onClickToggle(e){
    let el = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")
  }

  onClickRelated(event,id){
    let param       = event.id
    this.productID  = param;

    this.getData(param)
    this.content.scrollToTop();
    this.productFocus.calculeSugar()

    // close all accordeon
    let acc = document.getElementsByClassName('open')
    let btn = document.getElementsByClassName('rotate')
    //console.log(acc)
    for (let i = 0; i < acc.length; i++) {
        acc[i].classList.toggle("open");
        btn[i].classList.toggle("rotate");
    }
    let self = this;
    setTimeout(function(){
      self.productFocus.animateSugar()
    }, 500)

    /*
    let self = this;
    setTimeout(function(){
      self.animateSugar()
    }, 500)
    */
  }

  onClickAdd(){
    if(this.isAuth == true){
      this.nav.push(AddPage)
    }
    else {
      this.nav.push(UserPage)
    }
  }

  onClickBack(){
    this.nav.pop()
  }

  onPageScroll(event) {
      //console.log(event);
      let ionNavBarToolbar = event.target.offsetParent.previousElementSibling.firstElementChild.firstElementChild;
      //let ionContentTitle = document.getElementsByTagName('h1');
      //console.log(ionContentTitle)
      if(event.target.scrollTop >= 5){
          ionNavBarToolbar.classList.add('scroll')

          this.titleUnvisible = false;
          this.titleH1Unvisible = true;
          //ionContentTitle[1].classList.add('opacity')
      }
      else {
        if (ionNavBarToolbar.classList.contains('scroll') == true ){
          ionNavBarToolbar.classList.remove('scroll')

          this.titleUnvisible = true;
          this.titleH1Unvisible = false;
          //ionContentTitle[1].classList.remove('opacity')
        }
      }

  }



  ionViewDidEnter(){
    //let ionNavBarTitle = document.getElementsByClassName('toolbar-content');
    //ionNavBarTitle[1].classList.add('hide')
    //this.animateSugar()

  }
  ngAfterViewInit() {
    this.content.addScrollListener((event) =>  {
        this.onPageScroll(event);
    });
  }
}
