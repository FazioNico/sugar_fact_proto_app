import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {

    urlProtocole:string = 'http://';
    ndd:string = 'openfoodfacts.org'
    country:string = 'world.';
    ch:string = 'ch-fr.';
    cgiUrl:string = '/cgi/search.pl?search_terms=';
    apiUrl: string= '/api/v0'
    product: string= '/product/'
    categorie: string= '/category/'
    parmUrl:string;
    format:string = '&search_simple=1&json=1';

    constructor(public http: Http) {
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
}
