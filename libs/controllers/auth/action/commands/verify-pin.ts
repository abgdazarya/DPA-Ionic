import { createAction, on, props } from '@ngrx/store';
import { VerifyPinDto } from '../../dtos/verify-pin.dto';
import { InteractionType } from '@shared';

export const VerifyPin = createAction(
  'Services.Auth.Commands.VerifyPin',
  props<{ payload: VerifyPinDto; async?: boolean }>()
);

export const VerifyPinReset = createAction(
  'Services.Auth.Commands.VerifyPinReset',
  props<{ response: any; async?: boolean }>()
);

export const VerifyPinInteractionReset = createAction(
  'Services.Auth.Commands.VerifyPinInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const VerifyPinActionReducer = on(VerifyPin, (state: any) => {
  return {
    ...state,
  };
});

export const VerifyPinActionResetReducer = on(
  VerifyPinReset,
  (state: any, { response }) => {
    return {
      ...state,
      verifyPin: {
        ...state?.verifyPin,
        main: {
          ...state?.verifyPin?.main,
          ...response,
        },
      },
    };
  }
);

export const VerifyPinInteractionActionReducer = on(VerifyPin, (state: any) => {
  return {
    ...state,
    verifyPin: {
      ...state?.verifyPin,
      main: {
        ...state?.verifyPin?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const VerifyPinInteractionActionResetReducer = on(
  VerifyPinInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      verifyPin: {
        ...state?.verifyPin,
        main: {
          ...state?.verifyPin?.main,
          ...response,
        },
      },
    };
  }
);
