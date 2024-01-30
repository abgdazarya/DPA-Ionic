import { MENU_PROMOTION_INTERACTION_ACTION_REDUCERS } from '@controllers/menu-promotion';
import { createReducer } from '@ngrx/store';
import { MENU_PROMOTION_INTERACTION_INITIAL_STATE } from '../states/menu-promotion.interaction.state';

export const menuPromotionInteractionReducer = createReducer(
  MENU_PROMOTION_INTERACTION_INITIAL_STATE,

  ...MENU_PROMOTION_INTERACTION_ACTION_REDUCERS
);
