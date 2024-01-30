import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { UserRateData } from '../../models/rate';

export const GetUserRateSucceed = createAction(
  'Services.Profile.Events.GetUserRateSucceed',
  props<{ response: DataResponse<UserRateData> }>()
);

export const GetUserRateSucceedActionReducer = on(
  GetUserRateSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      userRate: {
        ...state?.userRate,
        main: {
          ...state?.userRate?.main,
          ...response,
        },
      },
    };
  }
);

export const GetUserRateSucceedInteractionActionReducer = on(
  GetUserRateSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      userRate: {
        ...state?.userRate,
        main: {
          ...state?.userRate?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
