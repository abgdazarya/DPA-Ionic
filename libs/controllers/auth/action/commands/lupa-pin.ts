import { createAction, on, props } from '@ngrx/store';
import { LupaPinDto } from '../../dtos/lupa-pin.dto';
import { InteractionType } from '@shared';

export const LupaPin = createAction(
  'Services.Auth.Commands.LupaPin',
  props<{ payload: LupaPinDto; async?: boolean }>()
);

export const LupaPinReset = createAction(
  'Services.Auth.Commands.LupaPinReset',
  props<{ response: any; async?: boolean }>()
);

export const LupaPinInteractionReset = createAction(
  'Services.Auth.Commands.LupaPinInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const LupaPinActionReducer = on(LupaPin, (state: any) => {
  return {
    ...state,
  };
});

export const LupaPinActionResetReducer = on(
  LupaPinReset,
  (state: any, { response }) => {
    return {
      ...state,
      lupaPin: {
        ...state?.lupaPin,
        main: {
          ...state?.lupaPin?.main,
          ...response,
        },
      },
    };
  }
);

export const LupaPinInteractionActionReducer = on(LupaPin, (state: any) => {
  return {
    ...state,
    lupaPin: {
      ...state?.lupaPin,
      main: {
        ...state?.lupaPin?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const LupaPinInteractionActionResetReducer = on(
  LupaPinInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      lupaPin: {
        ...state?.lupaPin,
        main: {
          ...state?.lupaPin?.main,
          ...response,
        },
      },
    };
  }
);
