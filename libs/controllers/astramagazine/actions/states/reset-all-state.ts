import { createAction, on } from '@ngrx/store';
import { MENU_ASTRAMAGAZINE_INTERACTION_INITIAL_STATE } from '../../../../stores/astramagazine/states/menu-astramagazine.interaction.state';
import { MENU_ASTRAMAGAZINE_INITIAL_STATE } from '../../../../stores/astramagazine/states/menu-astramagazine.state';

export const ResetAllState = createAction(
  'Services.Astramagazine.States.ResetAllState'
);

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...MENU_ASTRAMAGAZINE_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...MENU_ASTRAMAGAZINE_INTERACTION_INITIAL_STATE,
    };
  }
);
