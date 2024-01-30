import { MENU_ASTRAMAGAZINE_INTERACTION_ACTION_REDUCERS } from '@controllers/menu-astramagazine';
import { createReducer } from '@ngrx/store';
import {
  MENU_ASTRAMAGAZINE_INTERACTION_INITIAL_STATE,
  MenuAstramagazineInteractionState,
} from '../states/menu-astramagazine.interaction.state';

export const menuAstramagazineInteractionReducer =
  createReducer<MenuAstramagazineInteractionState>(
    MENU_ASTRAMAGAZINE_INTERACTION_INITIAL_STATE,

    ...MENU_ASTRAMAGAZINE_INTERACTION_ACTION_REDUCERS
  );
