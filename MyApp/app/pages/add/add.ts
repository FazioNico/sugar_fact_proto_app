import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';

import { ApiService } from '../../providers/api-service/api-service';
import { HeaderContent } from '../../components/header-content/header-content';

import { FORM_DIRECTIVES, FormBuilder, Validators, AbstractControl, ControlGroup } from '@angular/common';

/*
  Generated class for the AddPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add/add.html',
  directives: [[HeaderContent],[FORM_DIRECTIVES]],
  providers: [ApiService]
})
export class AddPage {

  base64Image: any = null;
  product:any = null;
  myForm: ControlGroup;
  barcode:string;
  /*
  myData: any;
  name: string;
  denomination:string;
  quantity:string;
  ingredients: string;
  */

  userLog:string= 'fazio';
  userPass:string= 'OFF2663000?_';

  constructor(private nav: NavController,public apiService: ApiService, private fb: FormBuilder) {


    //this.myData = null;
    this.myForm = fb.group({
      barcode: ["", Validators.required],
      name: ["", Validators.required],
      denomination: ["", Validators.required],
      quantity: ["", Validators.required],
      ingredients: ["", Validators.required],
      nutriments: fb.group({
        energy: ["", Validators.required],
        proteins: ["", Validators.required],
        fat: ["", Validators.required],
        fat_sat: ["", Validators.required],
        sugar: ["", Validators.required],
        sugar_sat: ["", Validators.required],
        fiber: ["", Validators.required],
        salt: ["", Validators.required],
      })
    })
  }


  getPicture(){
    console.log('pic starting')
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 400,
      targetHeight: 400
    })
    .then(
      (imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData
      },
      (error) => {
        console.log("Error:"+error)
      }
    )
  }

  onSubmit(){
    console.log(this.myForm)
    //this.myData = formData;

    if(this.myForm.status == 'INVALID'){
      console.log('Form valid -> submitted ');
      this.product                  = this.myForm.value

      let dataReady:any             = {}
      dataReady.code                = this.product.barcode
      dataReady.product_name        = this.product.name
      //dataReady.product_denomination = this.product.denomination
      dataReady.quantity            = this.product.quantity

      dataReady.nutriment_energy    = this.product.nutriments.energy
      dataReady.nutriment_fat       = this.product.nutriments.fat
      dataReady.nutriment_fat_sat   = this.product.nutriments.fat_sat
      dataReady.nutriment_sugar     = this.product.nutriments.sugar
      dataReady.nutriment_sugar_sat = this.product.nutriments.sugar_sat
      dataReady.nutriment_fiber     = this.product.nutriments.fiber
      dataReady.nutriment_proteins  = this.product.nutriments.proteins
      dataReady.nutriment_salt      = this.product.nutriments.salt
      dataReady.ingredients_text    = this.product.ingredients

      dataReady.lang                = 'fr';
      //dataReady.user_id = this.userLog
      //dataReady.password = this.userPass

      //console.log(this.SerializeParams(dataReady))
      let resultPost = this.apiService.save(this.SerializeParams(dataReady));
      console.log(resultPost)
    }
  }
  onClickToggle(e){
    //console.log(e)
    let el = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")
  }

  SerializeParams<T>(Datas: T): string|number {
     let keys:any = Object.keys(Datas);
     let stringParams: string = "?";
     for (let i in keys) {
         let name = keys[i];
         if(Datas[name].length >= 1){
           if (i == '0')
               stringParams += name + "=" + Datas[name];
           else
               stringParams += "&" + name + "=" + Datas[name]
         }
     }
     return stringParams;
  };
}
