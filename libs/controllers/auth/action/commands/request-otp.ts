import { INITIAL_STATE, createAction, on, props } from '@ngrx/store';
import { RequestOtpDto } from '../../dtos/request-otp.dto';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';

export const RequestOtp = createAction(
  'Services.Auth.Commands.RequestOtp',
  props<{ payload: RequestOtpDto; async?: boolean }>()
);

export const RequestOtpReset = createAction(
  'Services.Auth.Commands.RequestOtpReset',
  props<{ response: any; async?: boolean }>()
);

export const RequestOtpInteractionReset = createAction(
  'Services.Auth.Commands.RequestOtpInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const RequestOtpActionReducer = on(RequestOtp, (state: any) => {
  return {
    ...state,
  };
});

export const RequestOtpActionResetReducer = on(
  RequestOtpReset,
  (state: any, { response }) => {
    return {
      ...state,
      requestOtp: {
        ...state?.requestOtp,
        ...INITIAL_STATE,
        main: {
          ...INITIAL_STATE,
          ...response,
        },
      },
    };
  }
);

export const RequestOtpInteractionActionReducer = on(
  RequestOtp,
  (state: any) => {
    return {
      ...state,
      requestOtp: {
        ...state?.requestOtp,
        type: InteractionType.PROCESS,
        isLoading: true,
        error: null,
        success: null,
        main: {
          ...state?.requestOtp?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
          error: null,
          success: null,
        },
      },
    };
  }
);

export const RequestOtpInteractionActionResetReducer = on(
  RequestOtpInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      requestOtp: {
        ...INITIAL_INTERACTION_STATE,
        main: {
          ...INITIAL_INTERACTION_STATE,
          ...response,
        },
      },
    };
  }
);
