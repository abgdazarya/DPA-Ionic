import { createAction, on } from '@ngrx/store';
import { HOME_INITIAL_INTERACTION_STATE } from '../../../../stores/home/states/home.interaction.state';
import { HOME_INITIAL_STATE } from '../../../../stores/home/states/home.state';

export const ResetAllState = createAction('Services.Home.States.ResetAllState');

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...HOME_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...HOME_INITIAL_INTERACTION_STATE,
    };
  }
);
