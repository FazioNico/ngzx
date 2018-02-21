import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppStoreService } from '../../store/app-store.service';
import { AppStateI } from '../../store/app-state';
import * as <%= dasherize(name) %> from './<%= dasherize(name) %>.actions';
import { I<%= classify(name) %>State } from './<%= dasherize(name) %>.reducer';

@Injectable()
export class <%= classify(name) %>StoreService extends AppStoreService {

  protected STATE = '<%= dasherize(name) %>';

  constructor(
    protected store: Store<AppStateI>
  ) { super(); }


  dispatchActionNameAction(): void {
    this.dispatchAction(new <%= dasherize(name) %>.Action_NameAction());
  }


  // prevent error implementation of unused methodes
  dispatchCreateAction(record: any): void {}
  dispatchLoadAction(params: {path: string}): void {}
  dispatchUpdateAction(record: any): void {}
  dispatchRemoveAction(id: string | number): void {}

  // Accessor sample of how to select piece of the state
  get(): Observable<I<%= classify(name) %>State> {
    this.STATE = '<%= dasherize(name) %>';
    return this.storeSelectFeatureState().pipe(
      map((state: I<%= classify(name) %>State) => {
        return state;
      })
    );
  }
}
