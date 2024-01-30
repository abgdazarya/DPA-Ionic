import { createAction, on } from '@ngrx/store';
import { MENU_INITIAL_INTERACTION_STATE } from '../../../../stores/menu/states/menu.interaction.state';
import { MENU_INITIAL_STATE } from '../../../../stores/menu/states/menu.state';

export const ResetAllState = createAction('Services.Menu.States.ResetAllState');

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...MENU_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...MENU_INITIAL_INTERACTION_STATE,
    };
  }
);
