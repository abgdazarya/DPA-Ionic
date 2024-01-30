import { createAction, on, props } from '@ngrx/store';
import { VerifyReferralCodeDto } from '../../dtos/verify-referral-code.dto';
import { InteractionType } from '@shared';

export const VerifyReferralCode = createAction(
  'Services.Auth.Commands.VerifyReferralCode',
  props<{ payload: VerifyReferralCodeDto; async?: boolean }>()
);

export const VerifyReferralCodeReset = createAction(
  'Services.Auth.Commands.VerifyReferralCodeReset',
  props<{ response: any; async?: boolean }>()
);

export const VerifyReferralCodeInteractionReset = createAction(
  'Services.Auth.Commands.VerifyReferralCodeInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const VerifyReferralCodeActionReducer = on(
  VerifyReferralCode,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const VerifyReferralCodeActionResetReducer = on(
  VerifyReferralCodeReset,
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

export const VerifyReferralCodeInteractionActionReducer = on(
  VerifyReferralCode,
  (state: any) => {
    return {
      ...state,
      verifyReferralCode: {
        ...state?.verifyReferralCode,
        main: {
          ...state?.verifyReferralCode?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const VerifyReferralCodeInteractionActionResetReducer = on(
  VerifyReferralCodeInteractionReset,
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
