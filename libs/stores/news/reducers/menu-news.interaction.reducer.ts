import { MENU_NEWS_INTERACTION_ACTION_REDUCERS } from '@controllers/menu-news';
import { createReducer } from '@ngrx/store';
import { MENU_NEWS_INTERACTION_INITIAL_STATE } from '../states/menu-news.interaction.state';

export const menuNewsInteractionReducer = createReducer(
  MENU_NEWS_INTERACTION_INITIAL_STATE,

  ...MENU_NEWS_INTERACTION_ACTION_REDUCERS
);
