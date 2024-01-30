import { createAction, on, props } from '@ngrx/store';
import { VerifyOtpData } from '../../models/verify-otp-data';
import { DataResponse, InteractionType } from '@shared';

export const VerifyOtpSucceed = createAction(
  'Services.Auth.Events.VerifyOtpSucceed',
  props<{ response: DataResponse<VerifyOtpData> }>()
);

export const VerifyOtpSucceedActionReducer = on(
  VerifyOtpSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyOtp: {
        ...state?.verifyOtp,
        main: {
          ...state?.verifyOtp?.main,
          ...response,
        },
      },
    };
  }
);

export const VerifyOtpSucceedInteractionActionReducer = on(
  VerifyOtpSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyOtp: {
        ...state?.verifyOtp,
        main: {
          ...state?.verifyOtp?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
