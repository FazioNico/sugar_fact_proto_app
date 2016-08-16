import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/*
  Generated class for the MenuSlide component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'menu-slide',
  templateUrl: 'build/components/menu-slide/menu-slide.html'
})
export class MenuSlide implements OnInit {
  contentInit:any;
  @Input() content: any;
  @Input() btnUserAuth:boolean = null;
  @Output() clickLog: EventEmitter<any> = new EventEmitter();
  @Output() clickMenu: EventEmitter<any> = new EventEmitter();

  constructor() {

  }
  onClickLogin(){
    //console.log('emit')
    this.clickLog.emit({})
  }
  eventClick(value){
    //console.log(value)
    this.clickMenu.emit({page: value})
  }
  ngOnInit(){
    console.log('init')
    this.contentInit = this.content;
  }
}
