import { MetaReducer, ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { AppStateI, RecucerStateI } from './app-state';
import * as fromLoading from './reducers/loading.reducer';
import { environment } from '@env/environment';

// Only root reducer state without lazy module state.
const reducers: RecucerStateI = {
  loading: fromLoading.reducer,
  routerReducer: routerReducer
};

export const reducer: ActionReducerMap<AppStateI> = reducers;
export const metaReducers: MetaReducer<AppStateI>[] =  !environment.production ? [storeFreeze] : [];
