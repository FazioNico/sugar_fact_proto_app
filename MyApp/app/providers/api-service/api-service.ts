import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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

    postUrlProduct:string= 'http://world.openfoodfacts.org/cgi/product_jqm2.pl';
    user:string= 'off';
    password:string= 'off';

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


    // add new product
    save(product): Promise<any>  {
      console.log('save befor server')
      return this.post(product);
    }
    private post(product: any): Promise<any> {
      /**
      let fd = new FormData();
      let headers = new Headers({
        //'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data'
      });
      fd.append('data', JSON.stringify(product));
      return this.http
                 .post(this.postUrl, fd, {headers: headers})
                 .toPromise()
                 .then(res => res.json().data)
                 .catch(this.handleError);
      §**/
       product.user_id = 'off';
       product.password = 'off';
       console.log(product)
       // Parameters obj-
       let params: URLSearchParams = new URLSearchParams();
       //params.set('code', product.code);
       params.set('code', '3073780969000');
       //params.set('user_id', product.user_id);
       //params.set('password', product.password);
       params.set('product_name', product.product_name);
       params.set('ingredients_text', product.ingredients_text);
       params.set('nutriment_energy', product.nutriment_energy);
       params.set('quantity', product.quantity);
       // option seting
       return this.http
                  .get(this.postUrlProduct, {search: params})
                  .toPromise()
                  .then(res => res.json().data)
                  .catch(this.handleError);
    }


    private handleError(error: any) {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }

}
