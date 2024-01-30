import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { VerifyOtpData } from '../../models/verify-otp-data';

export const VerifyOtpFailed = createAction(
  'Services.Auth.Events.VerifyOtpFailed',
  props<{ response: DataResponse<VerifyOtpData> }>()
);

export const VerifyOtpFailedActionReducer = on(
  VerifyOtpFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const VerifyOtpFailedInteractionActionReducer = on(
  VerifyOtpFailed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyOtp: {
        ...state?.verifyOtp,
        main: {
          ...state?.verifyOtp?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
