import { createAction, on, props } from '@ngrx/store';
import { VerifyReferralCodeData } from '../../models/verify-referral-code-data';
import { DataResponse, InteractionType } from '@shared';

export const VerifyReferralCodeSucceed = createAction(
  'Services.Auth.Events.VerifyReferralCodeSucceed',
  props<{ response: DataResponse<VerifyReferralCodeData> }>()
);

export const VerifyReferralCodeSucceedActionReducer = on(
  VerifyReferralCodeSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyReferralCode: {
        ...state?.verifyReferralCode,
        main: {
          ...state?.verifyReferralCode?.main,
          ...response,
        },
      },
    };
  }
);

export const VerifyReferralCodeSucceedInteractionActionReducer = on(
  VerifyReferralCodeSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyReferralCode: {
        ...state?.verifyReferralCode,
        main: {
          ...state?.verifyReferralCode?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
