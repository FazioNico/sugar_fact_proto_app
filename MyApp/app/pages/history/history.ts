import { Component }        from '@angular/core';
import { NavController }    from 'ionic-angular';

import { HeaderContent }    from '../../components/header-content/header-content';
import { Routes }           from '../../providers/routes/routes';
import { FirebaseService }  from '../../providers/firebase/firebase';
import { Store }            from '../../providers/store/store';

import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the HistoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/history/history.html',
  directives: [HeaderContent],
  providers: [
    FirebaseService,
    Store
  ],
  styles: [`
      .img_thumb {
        background-size: contain;
        background-position: center center;
        height: 80px;
        width: 80px;
        border-radius: 80px;
      }
    `]
})
export class HistoryPage {

  isAuth:boolean = false;
  historySearch:any[] = [];

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [
          [NavController],
          [Routes],
          [FirebaseService],
          [Store]
        ];
  }

  constructor(
    private nav       : NavController,
    private routes    : Routes,
    public authData   : FirebaseService,
    private _st       : Store
  ) {
    //// Check if user Auth == true
    this.authData = authData;
    this.authData.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true
        // load history list
        this.loadDataHistory(user)
      } else {
        this.isAuth = false
      }
    });
  }

  loadDataHistory(user){
    let self = this;
    let historySearch = [];
    let database = this.authData.database.ref('historySearch/' + user.uid);
    database.on('value', function(snapshot) {
      //console.log(snapshot.val());
      if(snapshot.val() === null){
        // no historySearch
      }
      else {
        for (var key in snapshot.val()) {
          if (snapshot.val().hasOwnProperty(key)) {
            //console.log(key, snapshot.val()[key])
            historySearch.push([key, snapshot.val()[key].time])
          }
        }
        //console.log('user historySearch database.ref() exist.')
        console.log('base order history ->', historySearch)
        self.searchDataProduct(historySearch)
      }
    });
  }

  searchDataProduct(arrayData){
    let _st = this._st;
    let historySearch = this.historySearch
    let arrayDataSorted = arrayData.sort(function (a, b) {
        if (a.time > b.time)
          return 1;
        if (a.time < b.time)
          return -1;
        // a doit être égale à b
        return 0;
    });
    for (var i = 0; i < arrayDataSorted.length; i++) {
      let code = arrayDataSorted[i][0];
      console.log(arrayDataSorted[i][0])
      _st.getProductData(code)
        .subscribe(
          (data) => {
            if(data.status === 1){
              console.log(data.product)
              historySearch.push(data.product)
            }
        });

    }
    /*
    arrayData.map((data)=>{
      var p2 = new Promise(function(resolve, reject) {
        _st.getProductData(data)
          .subscribe(
            (data) => {
              if(data.status === 1){
                console.log(data.product)
                historySearch.push(data.product)
              }
          });
        return
      });
      p2.then(function(id) {
        //historySearch.push(id)
        console.log('valeur ->',id)
        //console.log(historySearch)
        return
      })
    })
    */

  }

  /** Events Methode **/
  onClickBack(){
    this.nav.pop()
  }
}
