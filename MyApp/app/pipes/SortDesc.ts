import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the SortAsc pipe.
  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'sortDesc',
  pure: false
})
@Injectable()
export class SortDesc {
  /*
    Takes an array and sort in alphabetically order
   */
  transform(value: Array<any>, property:string="name") {
    return value.sort((a, b)=>{
        if(b[property] < a[property]) return -1;
        if(b[property] > a[property]) return 1;
        return 0;
    })
  }
}
