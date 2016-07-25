/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-07-2016
*/

import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';

import { HeaderContent }    from '../../components/header-content/header-content';

import {Routes} from '../../providers/routes/routes';
//import {Auth} from '../../providers/auth/auth';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/user/user.html',
  directives: [HeaderContent]
})
export class UserPage {
  isAuth:boolean = true;
  email:string;
  password:string;
  error:string;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [[NavController], [Routes]];
  }
  constructor(
    private nav: NavController,
    private routes:Routes
  ) {
  }

  login(){
    /*
    this.auth.login({email:this.email,password:this.password })
      .then((success)=>{

        this.goAdd();

      },(error)=>{
        this.error = error._body;
      })
    */
  }

  goAdd(){
      this.nav.push(this.routes.getPage(this.routes.ADD))
  }

  openSignup(){
    //let modal = Modal.create(this.routes.getPage(this.routes.SIGNUP));
    //this.nav.present(modal);
  }


}
