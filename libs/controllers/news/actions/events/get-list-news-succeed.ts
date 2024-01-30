import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { NewsModel } from '../../models/news.model';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const GetListNewsSucceed = createAction(
  'Services.Menu.News.Events.GetListNewsSucceed',
  props<{
    response: DataResponsePagination<NewsModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
  }>()
);

export const GetListNewsSucceedActionReducer = on(
  GetListNewsSucceed,
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

export const GetListNewsSucceedInteractionActionReducer = on(
  GetListNewsSucceed,
  (state: MenuNewsInteractionState, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
