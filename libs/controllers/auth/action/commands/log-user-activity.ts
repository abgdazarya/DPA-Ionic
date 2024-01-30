import { createAction, on, props } from '@ngrx/store';
import { LogUserActivityDto } from '../../dtos/log-user-activity.dto';
import { InteractionType } from '@shared';

export const LogUserActivity = createAction(
  'Services.Auth.Commands.LogUserActivity',
  props<{ payload: LogUserActivityDto; async?: boolean }>()
);

export const LogUserActivityReset = createAction(
  'Services.Auth.Commands.LogUserActivityReset',
  props<{ response: any; async?: boolean }>()
);

export const LogUserActivityInteractionReset = createAction(
  'Services.Auth.Commands.LogUserActivityInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const LogUserActivityActionReducer = on(
  LogUserActivity,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const LogUserActivityActionResetReducer = on(
  LogUserActivityReset,
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

export const LogUserActivityInteractionActionReducer = on(
  LogUserActivity,
  (state: any) => {
    return {
      ...state,
      logUserActivity: {
        ...state?.logUserActivity,
        main: {
          ...state?.logUserActivity?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const LogUserActivityInteractionActionResetReducer = on(
  LogUserActivityInteractionReset,
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
