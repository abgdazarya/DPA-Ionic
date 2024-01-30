import { createAction, on } from '@ngrx/store';
import { MENU_PROMOTION_INTERACTION_INITIAL_STATE } from '../../../../stores/promotion/states/menu-promotion.interaction.state';
import { MENU_PROMOTION_INITIAL_STATE } from '../../../../stores/promotion/states/menu-promotion.state';

export const ResetAllState = createAction(
  'Services.Promotion.States.ResetAllState'
);

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...MENU_PROMOTION_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...MENU_PROMOTION_INTERACTION_INITIAL_STATE,
    };
  }
);
