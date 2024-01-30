import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const TokenResponseSucceed = createAction(
  'Services.Auth.Events.TokenResponseSucceed',
  props<{ response: any }>()
);

export const TokenResponseSucceedActionReducer = on(
  TokenResponseSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      tokenResponse: {
        ...state?.tokenResponse,
        main: {
          ...state?.tokenResponse?.main,
          ...response,
        },
      },
    };
  }
);

export const TokenResponseSucceedInteractionActionReducer = on(
  TokenResponseSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      tokenResponse: {
        ...state?.tokenResponse,
        main: {
          ...state?.tokenResponse?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
