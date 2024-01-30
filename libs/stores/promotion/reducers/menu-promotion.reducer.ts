import { MENU_PROMOTION_ACTION_REDUCERS } from '@controllers/menu-promotion';
import { createReducer } from '@ngrx/store';
import {
  MENU_PROMOTION_INITIAL_STATE,
  MenuPromotionState,
} from '../states/menu-promotion.state';

export const menuPromotionReducer = createReducer<MenuPromotionState>(
  MENU_PROMOTION_INITIAL_STATE,

  ...MENU_PROMOTION_ACTION_REDUCERS
);
