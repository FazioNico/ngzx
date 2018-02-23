import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { <%= classify(name) %>Component } from './components';
import { routing } from './<%= dasherize(name) %>.routing';
import { <%= classify(name) %>Service } from './services/<%= dasherize(name) %>.service';
import { <%= classify(name) %>StoreModule } from './store/<%= dasherize(name) %>-store.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    <%= classify(name) %>StoreModule
  ],
  declarations: [
    <%= classify(name) %>Component
  ],
  providers: [
    <%= classify(name) %>Service
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class <%= classify(name) %>Module { }
