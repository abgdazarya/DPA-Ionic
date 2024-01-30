import { createAction, on, props } from '@ngrx/store';
import { VerifyOtpDto } from '../../dtos/verify-otp.dto';
import { InteractionType } from '@shared';

export const VerifyOtp = createAction(
  'Services.Auth.Commands.VerifyOtp',
  props<{ payload: VerifyOtpDto; async?: boolean }>()
);

export const VerifyOtpReset = createAction(
  'Services.Auth.Commands.VerifyOtpReset',
  props<{ response: any; async?: boolean }>()
);

export const VerifyOtpInteractionReset = createAction(
  'Services.Auth.Commands.VerifyOtpInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const VerifyOtpActionReducer = on(VerifyOtp, (state: any) => {
  return {
    ...state,
  };
});

export const VerifyOtpActionResetReducer = on(
  VerifyOtpReset,
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

export const VerifyOtpInteractionActionReducer = on(VerifyOtp, (state: any) => {
  return {
    ...state,
    verifyOtp: {
      ...state?.verifyOtp,
      main: {
        ...state?.verifyOtp?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const VerifyOtpInteractionActionResetReducer = on(
  VerifyOtpInteractionReset,
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
