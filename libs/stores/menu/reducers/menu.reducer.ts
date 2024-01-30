import { MENU_ACTION_REDUCERS } from '@controllers/menu';
import { createReducer } from '@ngrx/store';
import { MENU_INITIAL_STATE, MenuState } from '../states/menu.state';

export const menuReducer = createReducer<MenuState>(
  MENU_INITIAL_STATE,

  ...MENU_ACTION_REDUCERS
);
