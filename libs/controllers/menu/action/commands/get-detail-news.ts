import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailNews = createAction(
  'Services.Menu.Commands.GetDetailNews',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailNewsReset = createAction(
  'Services.Menu.Commands.GetDetailNewsReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailNewsInteractionReset = createAction(
  'Services.Menu.Commands.GetDetailNewsInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailNewsActionReducer = on(
  GetDetailNews,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailNewsActionResetReducer = on(
  GetDetailNewsReset,
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

export const GetDetailNewsInteractionActionReducer = on(
  GetDetailNews,
  (state: any, {}) => {
    return {
      ...state,
      news: {
        ...state?.news,
        detail: {
          ...state?.news?.detail,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetDetailNewsInteractionActionResetReducer = on(
  GetDetailNewsInteractionReset,
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
