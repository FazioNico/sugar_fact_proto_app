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
  myData: any;
  barcode:string;
  name: string;
  denomination:string;
  quantity:string;
  ingredients: string;

  constructor(private nav: NavController,public apiService: ApiService, private fb: FormBuilder) {


    this.myData = null;
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
      this.product = this.myForm.value

      let dataReady:any = {}
      dataReady.code = this.product.barcode
      dataReady.product_name = this.product.name
      dataReady.quantity = this.product.quantity
      dataReady.nutriment_energy = this.product.nutriments.energy
      dataReady.ingredients_text = this.product.ingredients

      //console.log(dataReady)
      this.apiService.save(dataReady)
    }

    //console.log(this.product)
    //console.log(JSON.stringify(this.product, null, 2))
    //console.log('Form submitted is ', this.myForm.controls);
  }

  onClickToggle(e){
    //console.log(e)
    let el = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")
  }

}
