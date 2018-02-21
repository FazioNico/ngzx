import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as <%= classify(name) %> from './<%= dasherize(name) %>.actions';
import { <%= classify(name) %>Service } from '../services/<%= dasherize(name) %>.service';

@Injectable()
export class <%= classify(name) %>Effects {

  constructor(
    private action$: Actions,
    private _<%= dasherize(name) %>: <%= classify(name) %>Service
  ) {
  }

  @Effect() Action_NameAction$: Observable<Action> = this.action$.pipe(
    ofType(<%= classify(name) %>.<%= classify(name) %>Actions.ACTION_NAME),
    switchMap((action) => this._<%= dasherize(name) %>.get()),
    switchMap(result =>
      (result.code === 200)
        ? of(new <%= classify(name) %>.SuccessAction(result))
        : of(new <%= classify(name) %>.ErrorAction(result))
    ),
    catchError(err => of(new <%= classify(name) %>.ErrorAction(err)))
  );

}
