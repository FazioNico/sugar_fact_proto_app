import { Component }        from '@angular/core';
import { NavController }    from 'ionic-angular';

import { HeaderContent }    from '../../components/header-content/header-content';
import { Routes }           from '../../providers/routes/routes';
import { FirebaseService }  from '../../providers/firebase/firebase';
/*
  Generated class for the HistoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/history/history.html',
  directives: [HeaderContent],
  providers: [
    FirebaseService
  ]
})
export class HistoryPage {

  isAuth:boolean = false;
  historySearch:any[] = [];

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [
          [NavController],
          [Routes],
          [FirebaseService]
        ];
  }

  constructor(
    private nav       : NavController,
    private routes    : Routes,
    public authData   : FirebaseService
  ) {
    //// Check if user Auth == true
    let self = this;
    let historySearch = [];
    this.authData = authData;
    this.authData.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true
        // save product id in history.save.list
        let database = this.authData.database.ref('historySearch/' + user.uid);
        database.on('value', function(snapshot) {
          //console.log(snapshot.val());
          if(snapshot.val() === null){
            // no historySearch
          }
          else {
            for (var key in snapshot.val()) {
              if (snapshot.val().hasOwnProperty(key)) {
                console.log(key, snapshot.val()[key])
                historySearch.push(key)
              }
            }
            //console.log('user historySearch database.ref() exist.')
            console.log(snapshot.val())
            self.searchDataProduct(historySearch)
          }
        });
      } else {
        this.isAuth = false
      }
    });
  }

  searchDataProduct(arrayData){
    this.historySearch = arrayData
  }

  /** Events Methode **/
  onClickBack(){
    this.nav.pop()
  }
}
