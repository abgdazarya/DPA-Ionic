import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { NewsModel } from '../../models/news.model';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const GetListNewsFailed = createAction(
  'Services.Menu.News.Events.GetListNewsFailed',
  props<{
    response: DataResponsePagination<NewsModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
  }>()
);

export const GetListNewsFailedActionReducer = on(
  GetListNewsFailed,
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

export const GetListNewsFailedInteractionActionReducer = on(
  GetListNewsFailed,
  (state: MenuNewsInteractionState, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
