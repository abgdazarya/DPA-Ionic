import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { News } from '../../models/news.model';

export const GetDetailNewsSucceed = createAction(
  'Services.Menu.Events.GetDetailNewsSucceed',
  props<{ response: DataResponse<News> }>()
);

export const GetDetailNewsSucceedActionReducer = on(
  GetDetailNewsSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      news: {
        ...state?.news,
        detail: {
          ...state?.news?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailNewsSucceedInteractionActionReducer = on(
  GetDetailNewsSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      news: {
        ...state?.news,
        detail: {
          ...state?.news?.detail,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
