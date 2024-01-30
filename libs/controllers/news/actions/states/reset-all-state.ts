import { createAction, on } from '@ngrx/store';
import { MENU_NEWS_INTERACTION_INITIAL_STATE } from '../../../../stores/news/states/menu-news.interaction.state';
import { MENU_NEWS_INITIAL_STATE } from '../../../../stores/news/states/menu-news.state';

export const ResetAllState = createAction('Services.News.States.ResetAllState');

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...MENU_NEWS_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...MENU_NEWS_INTERACTION_INITIAL_STATE,
    };
  }
);
