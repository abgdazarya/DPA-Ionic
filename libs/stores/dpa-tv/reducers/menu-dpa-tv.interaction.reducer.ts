import { MENU_DPA_TV_INTERACTION_ACTION_REDUCERS } from '@controllers/menu-dpa-tv';
import { createReducer } from '@ngrx/store';
import {
  MENU_DPA_TV_INTERACTION_INITIAL_STATE,
  MenuDpaTvInteractionState,
} from '../states/menu-dpa-tv.interaction.state';

export const menuDpaTvInteractionReducer =
  createReducer<MenuDpaTvInteractionState>(
    MENU_DPA_TV_INTERACTION_INITIAL_STATE,

    ...MENU_DPA_TV_INTERACTION_ACTION_REDUCERS
  );
