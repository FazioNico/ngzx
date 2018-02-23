import { NgModule, ModuleWithProviders } from '@angular/core';

// Import ngrx Tools
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { reducer, metaReducers } from './app.reducer';
import { CustomSerializer } from './app-state';
import { environment } from '@env/environment';

// add core providers here
const providers: any[] =  [
  { provide: RouterStateSerializer, useClass: CustomSerializer }
];
// add core effect here
const effects: any[] = [];

/*
  Bootstrap NgRxStoreModule
  with default root store state & reducer & effects
  => rest of store will be loaded with lazy loading ;-)
*/
@NgModule({
  imports: [
    StoreModule.forRoot(reducer, { metaReducers }),
    EffectsModule.forRoot([...effects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [...providers, ...effects]
})
export class NgRxStoreModule {
  // guarantee that only one instance of Services is added to the root module
  // see => https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgRxStoreModule,
      providers: [...providers, ...effects]
    };
  }
}
