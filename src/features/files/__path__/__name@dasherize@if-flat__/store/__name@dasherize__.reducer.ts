import { <%= classify(name) %>Actions, T<%= classify(name) %>Actions } from './<%= classify(name) %>.actions';

export type I<%= classify(name) %>State = boolean;
export const intitialState: I<%= classify(name) %>State = false;

export function reducer (
  state: I<%= classify(name) %>State = intitialState,
  action: T<%= classify(name) %>Actions
): I<%= classify(name) %>State {
  switch (action.type) {
    case <%= classify(name) %>Actions.ACTION_NAME: {
      return true;
    }

    case <%= classify(name) %>Actions.ERROR: {
      return false;
    }

    default: {
      return <I<%= classify(name) %>State>state;
    }
  }
}
