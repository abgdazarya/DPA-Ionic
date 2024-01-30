import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { NewsModel } from '../../models/news.model';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const SetReadNewsFailed = createAction(
  'Services.Menu.News.Events.SetReadNewsFailed',
  props<{ response: DataResponse<NewsModel> }>()
);

export const SetReadNewsFailedActionReducer = on(
  SetReadNewsFailed,
  (state: any, { response }) => {
    return {
      ...state,
      manage: response,
    };
  }
);

export const SetReadNewsFailedInteractionActionReducer = on(
  SetReadNewsFailed,
  (state: any, { response }) => {
    return {
      ...state,
      manage: {
        ...state?.manage,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
