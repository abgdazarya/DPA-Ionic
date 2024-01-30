import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const GetPublicListNews = createAction(
  'Services.Menu.News.Commands.GetPublicListNews',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListNewsReset = createAction(
  'Services.Menu.News.Commands.GetPublicListNewsReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListNewsInteractionReset = createAction(
  'Services.Menu.News.Commands.GetPublicListNewsInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListNewsActionReducer = on(
  GetPublicListNews,
  (state: MenuNewsState, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListNewsActionResetReducer = on(
  GetPublicListNewsReset,
  (state: MenuNewsState, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        ...response,
      },
    };
  }
);

export const GetPublicListNewsInteractionActionReducer = on(
  GetPublicListNews,
  (state: MenuNewsInteractionState, { dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetPublicListNewsInteractionActionResetReducer = on(
  GetPublicListNewsInteractionReset,
  (state: MenuNewsInteractionState, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        ...response,
      },
    };
  }
);
