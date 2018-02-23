import { Action } from '@ngrx/store';
import { NgRxAction } from '../../store/ngrx.actions';

export const <%= classify(name) %>Actions = {
  ACTION_NAME:'[<%= classify(name) %>] Action',

  SUCCESS: '[<%= classify(name) %>] Success',
  ERROR: '[<%= classify(name) %>] Error'
};

export class Action_NameAction extends NgRxAction<any> { type = <%= classify(name) %>Actions.ACTION_NAME; }

export class SuccessAction extends NgRxAction<any> { type = <%= classify(name) %>Actions.SUCCESS; }
export class ErrorAction extends NgRxAction<any> { type = <%= classify(name) %>Actions.ERROR; }

export type T<%= classify(name) %>Actions =
Action_NameAction |
ErrorAction;
