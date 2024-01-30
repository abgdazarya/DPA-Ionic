import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { News } from '../../models/news.model';

export const GetDetailNewsFailed = createAction(
  'Services.Menu.Events.GetDetailNewsFailed',
  props<{ response: DataResponse<News> }>()
);

export const GetDetailNewsFailedActionReducer = on(
  GetDetailNewsFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailNewsFailedInteractionActionReducer = on(
  GetDetailNewsFailed,
  (state: any, { response }) => {
    return {
      ...state,
      news: {
        ...state?.news,
        detail: {
          ...state?.news?.detail,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
