import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';

import { HeaderContent } from '../../components/header-content/header-content';

/*
  Generated class for the AddPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add/add.html',
  directives: [HeaderContent]
})
export class AddPage {

  base64Image: any = null;

  constructor(private nav: NavController) {

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

  onClickToggle(e){
    //console.log(e)
    let el = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")
  }

}
