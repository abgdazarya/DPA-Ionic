import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { NewsModel } from '../../models/news.model';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const GetDetailNewsFailed = createAction(
  'Services.Menu.News.Events.GetDetailNewsFailed',
  props<{ response: DataResponse<NewsModel> }>()
);

export const GetDetailNewsFailedActionReducer = on(
  GetDetailNewsFailed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: response,
    };
  }
);

export const GetDetailNewsFailedInteractionActionReducer = on(
  GetDetailNewsFailed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
