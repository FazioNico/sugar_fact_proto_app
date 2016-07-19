import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {

    urlProtocole:string   = 'http://';
    ndd:string            = 'openfoodfacts.org'
    country:string        = 'world.';
    ch:string             = 'ch-fr.';
    cgiUrl:string         = '/cgi/search.pl?search_terms=';
    apiUrl: string        = '/api/v0'
    product: string       = '/product/'
    categorie: string     = '/category/'
    format:string         = '&search_simple=1&json=1';
    parmUrl:string;

    postUrlProduct:string = 'http://world.openfoodfacts.org/cgi/product_jqm2.pl';
    postUrlProductTest:string = 'http://world.openfoodfacts.net/cgi/product_jqm2.pl';
    user:string           = 'fazio';
    password:string       = 'OFF2663000?_';

    constructor(
      public http   : Http
    ) {
    }

    getData(value){
      this.parmUrl = value;
      let queryUrl = this.urlProtocole + this.country+ this.ndd  + this.cgiUrl + this.parmUrl + this.format;
      return this.http.get(queryUrl)
        .map(res => res.json())
    }

    getProductData(value){
      this.parmUrl = value.toLowerCase();
      let queryUrl = this.urlProtocole + this.country+ this.ndd  + this.apiUrl + this.product + this.parmUrl + '.json';
      return this.http.get(queryUrl)
        .map(res => res.json())
    }

    getCategorieData(value){
      this.parmUrl = value;
      let queryUrl = this.urlProtocole + this.country+ this.ndd  + this.categorie + this.parmUrl + '.json';
      return this.http.get(queryUrl)
        .map(res => res.json())
    }

    // add new product
    save(product)   {
      console.log('save befor server')
      return this.post(product)
      .subscribe((data)=> {
        console.log(data)
      });
    }

    private post(productDataURI: string): Observable<any> {
      productDataURI += '&user_id=' + this.user + '&password=' + this.password
      /**
      let fd = new FormData();
      let headers = new Headers({
        //'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data'
      });
      fd.append('data', JSON.stringify(product));
      return this.http
                 .post(this.postUrlProductTest, fd, {headers: headers})
                 .toPromise()
                 .then(res => res.json().data)
                 .catch(this.handleError);
      **/
       //product.user_id = 'off';
       //product.password = 'off';
       //console.log(product)
       // Parameters obj-
       //let params: URLSearchParams = new URLSearchParams();
       //params.set('code', product.code);

       // option seting
       return this.http
                  .get(this.postUrlProduct+productDataURI)
                  .map(res => res.json())
                  /*
                  .toPromise()
                  .then(res => res.json())
                  //.catch(this.handleError);
                  */
    }

    private handleErrorProm(error: any) {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }

}
