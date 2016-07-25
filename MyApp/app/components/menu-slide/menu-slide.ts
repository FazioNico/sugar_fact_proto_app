import { Component } from '@angular/core';

/*
  Generated class for the MenuSlide component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'menu-slide',
  templateUrl: 'build/components/menu-slide/menu-slide.html'
})
export class MenuSlide {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }
}
