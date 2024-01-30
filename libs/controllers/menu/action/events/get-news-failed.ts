import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { News } from '../../models/news.model';

export const GetNewsFailed = createAction(
  'Services.Menu.Events.GetNewsFailed',
  props<{
    response: DataResponsePagination<News>;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
  }>()
);

export const GetNewsFailedActionReducer = on(
  GetNewsFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      news: {
        ...state?.news,
        [dataType]: {
          ...state?.news?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetNewsFailedInteractionActionReducer = on(
  GetNewsFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      news: {
        ...state?.news,
        [dataType]: {
          ...state?.news?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
