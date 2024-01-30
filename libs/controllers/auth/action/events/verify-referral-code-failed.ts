import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { VerifyReferralCodeData } from '../../models/verify-referral-code-data';

export const VerifyReferralCodeFailed = createAction(
  'Services.Auth.Events.VerifyReferralCodeFailed',
  props<{ response: DataResponse<VerifyReferralCodeData> }>()
);

export const VerifyReferralCodeFailedActionReducer = on(
  VerifyReferralCodeFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const VerifyReferralCodeFailedInteractionActionReducer = on(
  VerifyReferralCodeFailed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyReferralCode: {
        ...state?.verifyReferralCode,
        main: {
          ...state?.verifyReferralCode?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
