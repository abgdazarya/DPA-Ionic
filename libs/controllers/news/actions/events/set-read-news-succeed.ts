import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { NewsModel } from '../../models/news.model';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const SetReadNewsSucceed = createAction(
  'Services.Menu.News.Events.SetReadNewsSucceed',
  props<{ response: DataResponse<NewsModel> }>()
);

export const SetReadNewsSucceedActionReducer = on(
  SetReadNewsSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      manage: {
        ...state.manage,
        ...response,
      },
    };
  }
);

export const SetReadNewsSucceedInteractionActionReducer = on(
  SetReadNewsSucceed,
  (state: MenuNewsInteractionState, { response }) => {
    return {
      ...state,
      manage: {
        ...state?.manage,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
