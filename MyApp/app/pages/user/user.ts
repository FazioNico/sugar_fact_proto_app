/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-07-2016
*/

import { Component } from '@angular/core';
import { NavController, Modal, Loading, Alert } from 'ionic-angular';

import { HeaderContent }    from '../../components/header-content/header-content';

import {Routes} from '../../providers/routes/routes';
import {FirebaseService} from '../../providers/firebase/firebase';

import {
  FORM_DIRECTIVES,
  FormBuilder,
  Validators,
  AbstractControl,
  ControlGroup
}                           from '@angular/common';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/user/user.html',
  directives: [HeaderContent],
  providers: [FirebaseService]
})
export class UserPage {
  isAuth:any = false;
  email:string;
  password:string;
  error:string;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [[NavController], [Routes], [FirebaseService]];
  }

  public loading: Loading;
  public loginForm: any;

  constructor(
    private nav: NavController,
    private routes:Routes,
    public authData: FirebaseService,
    public formBuilder: FormBuilder
  ) {
    this.nav = nav;
    this.authData = authData;

    this.authData.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        // If there's a user take him to the home page.
        this.isAuth = true
        this.email = user.email
      } else {
        // If there's no user logged in send him to the LoginPage
        this.isAuth = false
      }
    });


    /*this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    */
  }


  loginUser(value){
    this.loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(this.loading);
    
    this.authData.loginUserFB(value.email, value.password)
    .then((authData) => {
      this.loading.dismiss();
      console.log('loged')
    }
    , (error) => {
        this.showError(error.message)
    });

  }

  goToSignup(){
    //this.nav.push(SignupPage);
  }

  goToResetPassword(){
    //this.nav.push(ResetPasswordPage);
  }

  gologout(){
    this.authData.logoutUser();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let prompt = Alert.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    this.nav.present(prompt);
  }
/*
  public registerUser(credentials) {
    console.log(credentials)
    this.showLoading()

    this.auth.createUser(credentials).then((authData) => {
      this.loading.dismiss();
      let prompt = Alert.create({
        title: 'Success',
        subTitle: 'Your new Account was created!',
        buttons: ['OK']
      });
      this.nav.present(prompt);
    }).catch((error) => {
      this.showError(error);
      this.loading.dismiss();
    });
  }
  public login(credentials) {
    this.showLoading()

    this.auth.login(credentials).then((authData) => {
      this.loading.dismiss();
      console.log('loged')
    }).catch((error) => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(this.loading);
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let prompt = Alert.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    this.nav.present(prompt);
  }



  goAdd(){
      this.nav.push(this.routes.getPage(this.routes.ADD))
  }

  openSignup(){
    //let modal = Modal.create(this.routes.getPage(this.routes.SIGNUP));
    //this.nav.present(modal);
  }
*/

}
