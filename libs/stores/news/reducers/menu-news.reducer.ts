import { MENU_NEWS_ACTION_REDUCERS } from '@controllers/menu-news';
import { createReducer } from '@ngrx/store';
import {
  MENU_NEWS_INITIAL_STATE,
  MenuNewsState,
} from '../states/menu-news.state';

export const menuNewsReducer = createReducer<MenuNewsState>(
  MENU_NEWS_INITIAL_STATE,

  ...MENU_NEWS_ACTION_REDUCERS
);
