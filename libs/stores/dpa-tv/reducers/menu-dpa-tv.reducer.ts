import { MENU_DPA_TV_ACTION_REDUCERS } from '@controllers/menu-dpa-tv';
import { createReducer } from '@ngrx/store';
import {
  MENU_DPA_TV_INITIAL_STATE,
  MenuDpaTvState,
} from '../states/menu-dpa-tv.state';

export const menuDpaTvReducer = createReducer<MenuDpaTvState>(
  MENU_DPA_TV_INITIAL_STATE,

  ...MENU_DPA_TV_ACTION_REDUCERS
);
