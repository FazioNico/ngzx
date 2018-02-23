import { Action, Store } from '@ngrx/store';
import { AppStateI } from './app-state';

/**
* Define an abstract class to be used by each module with store
* This can make more easeling provide generic methode to all child service.
*/
export abstract class AppStoreService {
  // do not forguet to init STATE proprety in each child module
  // to select the right feature store state.
  protected readonly STATE: any;
  protected store: Store<AppStateI>;

  protected storeSelectFeatureState(): Store<any> {
    return this.store.select(this.STATE);
  }

  protected dispatchAction(action: Action): void {
    this.store.dispatch(action);
  }

  /* in case you need to handle CRUD actions in all services
  these methods will need to be implemented by feature service */
  abstract dispatchLoadAction(params: {path: string}): void;
  abstract dispatchCreateAction(record: any): void;
  abstract dispatchUpdateAction(record: any): void;
  abstract dispatchRemoveAction(id: string|number): void;
}
