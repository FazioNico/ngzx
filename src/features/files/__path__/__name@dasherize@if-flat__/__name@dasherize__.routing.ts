import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { <%= classify(name) %>Component } from './components/<%= dasherize(name) %>/<%= dasherize(name) %>.component';

const routes: Routes = [
  { path: '', component: <%= classify(name) %>Component }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
