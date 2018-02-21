import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { <%= classify(name) %>Effects } from './<%= dasherize(name) %>.effects';
import * as from<%= classify(name) %> from './<%= dasherize(name) %>.reducer';
import { <%= classify(name) %>StoreService } from './<%= dasherize(name) %>-store.service';

@NgModule({
imports: [
  StoreModule.forFeature('<%= dasherize(name) %>', from<%= classify(name) %>.reducer),
  StoreDevtoolsModule.instrument(),
  EffectsModule.forFeature([<%= classify(name) %>Effects])
],
exports: [StoreModule, EffectsModule],
providers: [<%= classify(name) %>StoreService]
})
export class <%= classify(name) %>StoreModule {}
