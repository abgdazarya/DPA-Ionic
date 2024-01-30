import { createAction, on, props } from '@ngrx/store';
import {
  InteractionType,
  INITIAL_INTERACTION_STATE,
  DATA_RESPONSE_INITIAL_STATE,
} from '@shared';

export const TokenResponse = createAction(
  'Services.Auth.Commands.TokenResponse',
  props<{ async?: boolean }>()
);

export const TokenResponseReset = createAction(
  'Services.Auth.Commands.TokenResponseReset',
  props<{ async?: boolean }>()
);

export const TokenResponseInteractionReset = createAction(
  'Services.Auth.Commands.TokenResponseInteractionReset',
  props<{ async?: boolean }>()
);

export const TokenResponseActionReducer = on(TokenResponse, (state: any) => {
  return {
    ...state,
  };
});

export const TokenResponseActionResetReducer = on(
  TokenResponseReset,
  (state: any) => {
    return {
      ...state,
      tokenResponse: {
        ...state.tokenResponse,
        main: {
          ...DATA_RESPONSE_INITIAL_STATE,
        },
      },
    };
  }
);

export const TokenResponseInteractionActionReducer = on(
  TokenResponse,
  (state: any) => {
    return {
      ...state,
      tokenResponse: {
        ...state?.tokenResponse,
        main: {
          ...state?.tokenResponse?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const TokenResponseInteractionActionResetReducer = on(
  TokenResponseInteractionReset,
  (state: any) => {
    return {
      ...state,
      tokenResponse: {
        ...state?.tokenResponse,
        ...INITIAL_INTERACTION_STATE,
        main: {
          ...INITIAL_INTERACTION_STATE,
        },
      },
    };
  }
);
