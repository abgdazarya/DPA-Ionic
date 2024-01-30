import { createAction, on, props } from '@ngrx/store';
import {
  InteractionType,
  INITIAL_INTERACTION_STATE,
  DATA_RESPONSE_INITIAL_STATE,
} from '@shared';

export const RefreshToken = createAction(
  'Services.Auth.Commands.RefreshToken',
  props<{ async?: boolean }>()
);

export const RefreshTokenReset = createAction(
  'Services.Auth.Commands.RefreshTokenReset',
  props<{ async?: boolean }>()
);

export const RefreshTokenInteractionReset = createAction(
  'Services.Auth.Commands.RefreshTokenInteractionReset',
  props<{ async?: boolean }>()
);

export const RefreshTokenActionReducer = on(RefreshToken, (state: any) => {
  return {
    ...state,
  };
});

export const RefreshTokenActionResetReducer = on(
  RefreshTokenReset,
  (state: any) => {
    return {
      ...state,
      refreshToken: {
        ...state.refreshToken,
        main: {
          ...DATA_RESPONSE_INITIAL_STATE,
        },
      },
    };
  }
);

export const RefreshTokenInteractionActionReducer = on(
  RefreshToken,
  (state: any) => {
    return {
      ...state,
      refreshToken: {
        ...state?.refreshToken,
        main: {
          ...state?.refreshToken?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const RefreshTokenInteractionActionResetReducer = on(
  RefreshTokenInteractionReset,
  (state: any) => {
    return {
      ...state,
      refreshToken: {
        ...state?.refreshToken,
        ...INITIAL_INTERACTION_STATE,
        main: {
          ...INITIAL_INTERACTION_STATE,
        },
      },
    };
  }
);
