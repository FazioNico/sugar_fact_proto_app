import {Component, PLATFORM_DIRECTIVES, provide} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HeaderContent} from './components/header-content/header-content';
import {Routes} from './providers/routes/routes'

import {HomePage} from './pages/home/home';

import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {Http} from '@angular/http';
import { ApiService } from './providers/api-service/api-service';


@Component({
  templateUrl: 'build/app.html',
  providers: [Routes, ApiService]
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, private routes:Routes) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  ngOnInit() {
    this.rootPage = this.routes.getRootPage()
  }
}

ionicBootstrap(MyApp, [],{
    mode: 'md',
    platforms: {
     ios: {
       tabbarPlacement: 'top',
     }
   }
});
