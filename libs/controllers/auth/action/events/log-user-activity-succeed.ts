import { createAction, on, props } from '@ngrx/store';
import { LogUserActivityData } from '../../models/log-user-activity-data';
import { DataResponse, InteractionType } from '@shared';

export const LogUserActivitySucceed = createAction(
  'Services.Auth.Events.LogUserActivitySucceed',
  props<{ response: DataResponse<LogUserActivityData> }>()
);

export const LogUserActivitySucceedActionReducer = on(
  LogUserActivitySucceed,
  (state: any, { response }) => {
    return {
      ...state,
      logUserActivity: {
        ...state?.logUserActivity,
        main: {
          ...state?.logUserActivity?.main,
          ...response,
        },
      },
    };
  }
);

export const LogUserActivitySucceedInteractionActionReducer = on(
  LogUserActivitySucceed,
  (state: any, { response }) => {
    return {
      ...state,
      logUserActivity: {
        ...state?.logUserActivity,
        main: {
          ...state?.logUserActivity?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
