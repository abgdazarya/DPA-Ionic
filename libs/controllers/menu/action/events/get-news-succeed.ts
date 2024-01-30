import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { News } from '../../models/news.model';

export const GetNewsSucceed = createAction(
  'Services.Menu.Events.GetNewsSucceed',
  props<{
    response: DataResponsePagination<News>;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
  }>()
);

export const GetNewsSucceedActionReducer = on(
  GetNewsSucceed,
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

export const GetNewsSucceedInteractionActionReducer = on(
  GetNewsSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      news: {
        ...state?.news,
        [dataType]: {
          ...state?.news?.[dataType],
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
