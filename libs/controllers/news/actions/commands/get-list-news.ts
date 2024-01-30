import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const GetListNews = createAction(
  'Services.Menu.News.Commands.GetListNews',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListNewsReset = createAction(
  'Services.Menu.News.Commands.GetListNewsReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListNewsInteractionReset = createAction(
  'Services.Menu.News.Commands.GetListNewsInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListNewsActionReducer = on(
  GetListNews,
  (state: MenuNewsState, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetListNewsActionResetReducer = on(
  GetListNewsReset,
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

export const GetListNewsInteractionActionReducer = on(
  GetListNews,
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

export const GetListNewsInteractionActionResetReducer = on(
  GetListNewsInteractionReset,
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
