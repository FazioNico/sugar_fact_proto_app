/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   06-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 21-07-2016
*/

import { Component, PLATFORM_DIRECTIVES, provide } from '@angular/core';
import { Platform, ionicBootstrap }     from 'ionic-angular';
import { AuthHttp, AuthConfig }         from 'angular2-jwt';
import { Http, HTTP_PROVIDERS }         from '@angular/http';
import { StatusBar }                    from 'ionic-native';

import { Routes }                       from './providers/routes/routes'
import { HeaderContent }                from './components/header-content/header-content';
import { HomePage }                     from './pages/home/home';

import { ApiService }                   from './providers/api-service/api-service';
import { LocalStorageService }          from './providers/local-storage/local-storage';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/app.html',
  providers: [
    Routes,
    ApiService,
    LocalStorageService
  ]
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, private routes:Routes) {
    let config = {
      apiKey: "AIzaSyCL5kxvo0CLiBefaUDmWu5SjqxSv4piMAw",
      authDomain: "sugar-app-serve.firebaseapp.com",
      databaseURL: "https://sugar-app-serve.firebaseio.com",
      storageBucket: "sugar-app-serve.appspot.com",
    };
    firebase.initializeApp(config);


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      if(navigator.onLine == false){
        console.log('disconnected')
      }
      StatusBar.show();
      StatusBar.overlaysWebView(false);
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString("#0288d1");
    });
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
