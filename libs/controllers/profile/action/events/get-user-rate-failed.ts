import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { UserRateData } from '../../models/rate';

export const GetUserRateFailed = createAction(
  'Services.Profile.Events.GetUserRateFailed',
  props<{ response: DataResponse<UserRateData> }>()
);

export const GetUserRateFailedActionReducer = on(
  GetUserRateFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetUserRateFailedInteractionActionReducer = on(
  GetUserRateFailed,
  (state: any, { response }) => {
    return {
      ...state,
      userRate: {
        ...state?.userRate,
        main: {
          ...state?.userRate?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
