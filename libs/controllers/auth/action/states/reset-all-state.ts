import { createAction, on } from '@ngrx/store';
import { AUTH_INITIAL_INTERACTION_STATE } from '../../../../stores/auth/states/auth.interaction.state';
import { AUTH_INITIAL_STATE } from '../../../../stores/auth/states/auth.state';

export const ResetAllState = createAction('Services.Auth.States.ResetAllState');

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...AUTH_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...AUTH_INITIAL_INTERACTION_STATE,
    };
  }
);
