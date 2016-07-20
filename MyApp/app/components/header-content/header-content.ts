import { Component, Input } from '@angular/core';
/*
  Generated class for the ButtonMenu directive.

  See https://angular.io/docs/ts/latest/api/core/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Component({
  selector: 'header-content', // Attribute selector
  templateUrl: 'build/components/header-content/header-content.html',
  styles: [
    `
        .opacity-content {
          opacity: 0;
        }
    `
  ]
})
export class HeaderContent {


  @Input() title: string;
  @Input() isClassOpacity:boolean = false

  constructor() {

  }



  ngOnInit() {
  }
}
