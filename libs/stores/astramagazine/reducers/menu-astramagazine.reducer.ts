import { MENU_ASTRAMAGAZINE_ACTION_REDUCERS } from '@controllers/menu-astramagazine';
import { createReducer } from '@ngrx/store';
import {
  MENU_ASTRAMAGAZINE_INITIAL_STATE,
  MenuAstramagazineState,
} from '../states/menu-astramagazine.state';

export const menuAstramagazineReducer = createReducer<MenuAstramagazineState>(
  MENU_ASTRAMAGAZINE_INITIAL_STATE,

  ...MENU_ASTRAMAGAZINE_ACTION_REDUCERS
);
