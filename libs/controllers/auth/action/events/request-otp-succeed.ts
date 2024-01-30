import { createAction, on, props } from '@ngrx/store';
import { RequestOtpData } from '../../models/request-otp-data';
import { DataResponse, InteractionType } from '@shared';

export const RequestOtpSucceed = createAction(
  'Services.Auth.Events.RequestOtpSucceed',
  props<{ response: DataResponse<RequestOtpData> }>()
);

export const RequestOtpSucceedActionReducer = on(
  RequestOtpSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      requestOtp: {
        ...state?.requestOtp,
        main: {
          ...state?.requestOtp?.main,
          ...response,
        },
      },
    };
  }
);

export const RequestOtpSucceedInteractionActionReducer = on(
  RequestOtpSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      requestOtp: {
        ...state?.requestOtp,
        main: {
          ...state?.requestOtp?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
