/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   06-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 21-07-2016
*/

import { Component, PLATFORM_DIRECTIVES, provide, Inject, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap, NavController, MenuController }     from 'ionic-angular';
import { AuthHttp, AuthConfig }         from 'angular2-jwt';
import { Http, HTTP_PROVIDERS }         from '@angular/http';
import { StatusBar, Keyboard }          from 'ionic-native';

import { Routes }                       from './providers/routes/routes'
import { HeaderContent }                from './components/header-content/header-content';
import { HomePage }                     from './pages/home/home';
import { MenuSlide }                    from './components/menu-slide/menu-slide';

import { ApiService }                   from './providers/api-service/api-service';
import { LocalStorageService }          from './providers/local-storage/local-storage';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/app.html',
  providers: [
    Routes,
    ApiService,
    LocalStorageService
  ],
  directives: [
    MenuSlide
  ]
})
export class MyApp {

  isAuth:boolean = false;
  rootPage: any;

  /**
      use @ViewChild instead to grab the NavController instance
      view more on:  https://forum.ionicframework.com/t/why-cant-i-import-navcontroller-and-viewcontroller-into-service-or-app/40999/12
  **/
  @ViewChild('appcontent') nav: NavController;

  constructor(platform: Platform, private routes:Routes,public menuCtrl: MenuController) {
    let config = {
      apiKey: "AIzaSyCL5kxvo0CLiBefaUDmWu5SjqxSv4piMAw",
      authDomain: "sugar-app-serve.firebaseapp.com",
      databaseURL: "https://sugar-app-serve.firebaseio.com",
      storageBucket: "sugar-app-serve.appspot.com",
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true
      } else {
        this.isAuth = false
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      Keyboard.hideKeyboardAccessoryBar(false);
      if(navigator.onLine == false){
        console.log('disconnected')
      }
      StatusBar.show();
      StatusBar.overlaysWebView(false);
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString("#0288d1");
    });
  }

  onClickLogin(){
    //console.log('emit onClickLogin')
    this.menuCtrl.close();
    let navPage = this.nav.getActive()
    if(navPage.name != 'UserPage'){
      this.nav.setRoot(this.routes.getPage(this.routes.USER))
    }
    //console.log(navPage.name)
  }

  /** todo : testing function **/
  onEventMenuClick(event){
    //console.log(event.page)

    let navPage = this.nav.getActive()
    this.menuCtrl.close();

    switch (event.page) {
      case 'SearchPage':
        if(navPage.name != event.page){
          this.nav.setRoot(this.routes.getPage(this.routes.SEARCH))
        }
        break;
      case 'AboutPage':
        if(navPage.name != event.page){
          this.nav.setRoot(this.routes.getPage(this.routes.ABOUT))
        }
        break;
      case 'UserPage':
        if(navPage.name != event.page){
          this.nav.setRoot(this.routes.getPage(this.routes.USER))
        }
        break;
      case 'ScanPage':
        this.goScan();
        break;
    }

  }
  goScan(){
    //this.scanPlugin.scan()
    this.nav.setRoot(this.routes.getPage(this.routes.HOME))
  }
  ngOnInit() {
    this.rootPage = this.routes.getRootPage()
  }
}

ionicBootstrap(MyApp, [ HTTP_PROVIDERS ],{
    mode: 'md',
    platforms: {
     ios: {
       tabbarPlacement: 'top',
     }
   }
});
