import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LogUserActivityData } from '../../models/log-user-activity-data';

export const LogUserActivityFailed = createAction(
  'Services.Auth.Events.LogUserActivityFailed',
  props<{ response: DataResponse<LogUserActivityData> }>()
);

export const LogUserActivityFailedActionReducer = on(
  LogUserActivityFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const LogUserActivityFailedInteractionActionReducer = on(
  LogUserActivityFailed,
  (state: any, { response }) => {
    return {
      ...state,
      logUserActivity: {
        ...state?.logUserActivity,
        main: {
          ...state?.logUserActivity?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
