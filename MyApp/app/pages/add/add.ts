/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   12-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 28-07-2016
*/

import { Component }        from '@angular/core';
import { ViewChild }        from '@angular/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  Validators,
  AbstractControl,
  ControlGroup
}                           from '@angular/common';
import {
  NavController,
  NavParams ,
  Content
}                            from 'ionic-angular';
import { Camera }            from 'ionic-native';

//import { ApiService }        from '../../providers/api-service/api-service';
import { Store }             from '../../providers/store/store';
import { HeaderContent }     from '../../components/header-content/header-content';

import { MultipartItem }     from "../../plugins/multipart-upload/multipart-item";
import { MultipartUploader } from "../../plugins/multipart-upload/multipart-uploader";

const URL = 'http://world.openfoodfacts.org/cgi/product_image_upload.pl?code=2000000033861';
/*
  Generated class for the AddPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/add/add.html',
  directives: [
    HeaderContent,
    FORM_DIRECTIVES
  ],
  providers: [
    Store
  ]
})
export class AddPage {

  myForm: ControlGroup;
  barcode:string;
  base64Image: any     = null;
  product:any          = null;
  productAdded:boolean = false;

  /*** test multipart ***/
  private uploader:MultipartUploader = new MultipartUploader({url: URL});
	multipartItem:MultipartItem = new MultipartItem(this.uploader);
	idtest:string;
	file: File;
	upload : () => void;
	uploadCallback : (data) => void;
  /** eof **/

  @ViewChild(Content) content : Content;

  constructor(
    private   nav         : NavController,
    private   _st         : Store,
    private   fb          : FormBuilder,
    private   params      : NavParams
  ) {
    // if get nav params => set input barcode value
    if(this.params.get('id')){this.barcode = this.params.get('id')}
    // Set Form ControlGroup
    this.myForm = fb.group({
      barcode:      ["", Validators.required],
      name:         ["", Validators.required],
      quantity:     ["", Validators.required],
      ingredients:  ["", Validators.required],
      nutriments: fb.group({
          energy:     [""],
          proteins:   [""],
          fat:        [""],
          fat_sat:    [""],
          sugar:      [""],
          sugar_sat:  [""],
          fiber:      [""],
          salt:       [""],
      })
    })
    /*** test multipart ***/
    this.upload = () => {
			console.debug("home.ts & upload() ==>");
			if (null == this.file || null == this.idtest){
				console.error("home.ts & upload() form invalid.");
				return;
			}
			if (this.multipartItem == null){
				this.multipartItem = new MultipartItem(this.uploader);
			}
			if (this.multipartItem.formData == null)
				this.multipartItem.formData = new FormData();

      this.multipartItem.formData.append("code",  this.idtest);
      this.multipartItem.formData.append("imagefield",  'front');
			this.multipartItem.formData.append("imgupload_front",  this.file);

			this.multipartItem.callback = this.uploadCallback;
			this.multipartItem.upload();
		}

		this.uploadCallback = (data) => {
			console.debug("home.ts & uploadCallback() ==>");
			this.file = null;
			if (data){
				console.debug("home.ts & uploadCallback() upload file success.");
			}else{
				console.error("home.ts & uploadCallback() upload file false.");
			}
		}
    /** eof ***/
  }

  /*** Core Methode ***/
  /*** test multipart ***/
  selectFile($event): void {
		var inputValue = $event.target;
		if( null == inputValue || null == inputValue.files[0]){
			console.debug("Input file error.");
			return;
		}else {
			this.file = inputValue.files[0];
			console.debug("Input File name: " + this.file.name + " type:" + this.file.size + " size:" + this.file.size);
		}
	}
  /** eof **/

  getPicture(){
    console.log('pic starting')
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth:  400,
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

  SerializeParams<T>(Data: T): string|number {
     let keys:any = Object.keys(Data);
     let stringParams: string = "?";
     for (let i in keys) {
         let name = keys[i];
         if(Data[name].length >= 1){
           if (i == '0')
               stringParams += name + "=" + Data[name];
           else
               stringParams += "&" + name + "=" + Data[name]
         }
     }
     return stringParams;
  };

  /** Event Methode ***/
  onSubmit(){
    //console.log(this.myForm)
    if(this.myForm.status == 'VALID'){
      console.log('Form valid -> ready to submitted ');
      this.product                  = this.myForm.value
      let dataReady:any             = {}
      dataReady.code                = this.product.barcode
      dataReady.product_name        = this.product.name
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

      let resultPost = this._st.savedata(this.SerializeParams(dataReady));
      //let resultPost = 'TEST befor use aip: Post Form OK'
      console.log(resultPost)
      this.productAdded = true;

      /*** test to post image product to API ** /
       let dataImg = image from input
       let resultPostImg = this._st.saveImg(dataImg, this.product.barcode);

      /***
      * But test not working.. dont'know how to get image from input
      * and send to api as  multipart/form-data format =>  need suport
      ***/
    }
  }

  onClickToggle(e){
    let el = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")
  }

  onbackToSearch(){
    this.nav.popToRoot()
  }

  ngAfterViewInit() {
    let ionHeader = this.content.getElementRef().nativeElement.previousElementSibling
    ionHeader.classList.add('scroll')
  }

}
