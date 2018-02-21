import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, catchError } from 'rxjs/operators';

import { HttpService } from '../../shared/services/http/http.service';
import { environment } from '../../../environments/environment';
import { I<%= classify(name) %>State } from '../store/<%= dasherize(name) %>.reducer';


/*
Generated class for the <%= classify(name) %>Service provider.
See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/

@Injectable()
export class <%= classify(name) %>Service extends HttpService {

  private readonly _<%= dasherize(name) %>Url: string = '/<%= dasherize(name) %>';

  constructor(public http: HttpClient) {
    super(http);
  }

  get(): Observable<any> {
    this.path = this._<%= dasherize(name) %>Url;
    return this.get()
    .pipe(
      map(res => res || {}),
      catchError(err => of({
        error: err,
        message: err.message || 'Request failed!'
      }))
    );
  }

  post(_creds: any): Observable<any> {
    this.path = this._<%= dasherize(name) %>Url;
    return this.post(_creds)
    .pipe(
      catchError(err => of({
        error: err,
        message: err.message || 'Post request failed!'}
      ))
    );
  }

}
