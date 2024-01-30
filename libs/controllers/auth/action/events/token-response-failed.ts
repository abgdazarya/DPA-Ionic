import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const TokenResponseFailed = createAction(
  'Services.Auth.Events.TokenResponseFailed',
  props<{ response: any }>()
);

export const TokenResponseFailedActionReducer = on(
  TokenResponseFailed,
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

export const TokenResponseFailedInteractionActionReducer = on(
  TokenResponseFailed,
  (state: any, { response }) => {
    return {
      ...state,
      tokenResponse: {
        ...state?.tokenResponse,
        main: {
          ...state?.tokenResponse?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
