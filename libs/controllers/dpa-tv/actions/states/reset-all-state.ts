import { createAction, on } from '@ngrx/store';
import { MENU_DPA_TV_INTERACTION_INITIAL_STATE } from '../../../../stores/dpa-tv/states/menu-dpa-tv.interaction.state';
import { MENU_DPA_TV_INITIAL_STATE } from '../../../../stores/dpa-tv/states/menu-dpa-tv.state';

export const ResetAllState = createAction(
  'Services.DpaTv.States.ResetAllState'
);

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...MENU_DPA_TV_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...MENU_DPA_TV_INTERACTION_INITIAL_STATE,
    };
  }
);
