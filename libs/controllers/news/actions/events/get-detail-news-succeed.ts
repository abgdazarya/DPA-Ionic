import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { NewsModel } from '../../models/news.model';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const GetDetailNewsSucceed = createAction(
  'Services.Menu.News.Events.GetDetailNewsSucceed',
  props<{ response: DataResponse<NewsModel> }>()
);

export const GetDetailNewsSucceedActionReducer = on(
  GetDetailNewsSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state.detail,
        ...response,
      },
    };
  }
);

export const GetDetailNewsSucceedInteractionActionReducer = on(
  GetDetailNewsSucceed,
  (state: MenuNewsInteractionState, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
