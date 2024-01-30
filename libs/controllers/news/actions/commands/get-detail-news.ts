import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { MenuNewsInteractionState, MenuNewsState } from '@stores/menu-news';

export const GetDetailNews = createAction(
  'Services.Menu.News.Commands.GetDetailNews',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailNewsReset = createAction(
  'Services.Menu.News.Commands.GetDetailNewsReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailNewsInteractionReset = createAction(
  'Services.Menu.News.Commands.GetDetailNewsInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailNewsActionReducer = on(
  GetDetailNews,
  (state: MenuNewsState, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailNewsActionResetReducer = on(
  GetDetailNewsReset,
  (state: MenuNewsState, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);

export const GetDetailNewsInteractionActionReducer = on(
  GetDetailNews,
  (state: MenuNewsInteractionState, {}) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetDetailNewsInteractionActionResetReducer = on(
  GetDetailNewsInteractionReset,
  (state: MenuNewsInteractionState, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);
