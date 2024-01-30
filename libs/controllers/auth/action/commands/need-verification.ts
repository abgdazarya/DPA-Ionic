import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const NeedVerification = createAction(
  'Services.Auth.Commands.NeedVerification',
  props<{ payload?: any; async?: boolean }>()
);

export const NeedVerificationReset = createAction(
  'Services.Auth.Commands.NeedVerificationReset',
  props<{ response: any; async?: boolean }>()
);

export const NeedVerificationInteractionReset = createAction(
  'Services.Auth.Commands.NeedVerificationInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const NeedVerificationActionReducer = on(
  NeedVerification,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const NeedVerificationActionResetReducer = on(
  NeedVerificationReset,
  (state: any, { response }) => {
    return {
      ...state,
      needVerification: {
        ...state?.needVerification,
        main: {
          ...state?.needVerification?.main,
          ...response,
        },
      },
    };
  }
);

export const NeedVerificationInteractionActionReducer = on(
  NeedVerification,
  (state: any) => {
    return {
      ...state,
      needVerification: {
        ...state?.needVerification,
        main: {
          ...state?.needVerification?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const NeedVerificationInteractionActionResetReducer = on(
  NeedVerificationInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      needVerification: {
        ...state?.needVerification,
        main: {
          ...state?.needVerification?.main,
          ...response,
        },
      },
    };
  }
);
