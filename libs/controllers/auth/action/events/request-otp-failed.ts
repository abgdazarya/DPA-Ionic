import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { RequestOtpData } from '../../models/request-otp-data';

export const RequestOtpFailed = createAction(
  'Services.Auth.Events.RequestOtpFailed',
  props<{ response: DataResponse<RequestOtpData> }>()
);

export const RequestOtpFailedActionReducer = on(
  RequestOtpFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const RequestOtpFailedInteractionActionReducer = on(
  RequestOtpFailed,
  (state: any, { response }) => {
    return {
      ...state,
      requestOtp: {
        ...state?.requestOtp,
        main: {
          ...state?.requestOtp?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
