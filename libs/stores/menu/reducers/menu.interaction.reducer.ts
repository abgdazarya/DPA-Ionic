import { createReducer } from '@ngrx/store';
import { MENU_INITIAL_INTERACTION_STATE } from '../states/menu.interaction.state';
import { MENU_INTERACTION_ACTION_REDUCERS } from '@controllers/menu';

export const menuInteractionReducer = createReducer(
  MENU_INITIAL_INTERACTION_STATE,

  ...MENU_INTERACTION_ACTION_REDUCERS
);
