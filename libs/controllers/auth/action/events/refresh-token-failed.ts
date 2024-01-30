import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LoginData } from '../../models/login-data';

export const RefreshTokenFailed = createAction(
  'Services.Auth.Events.RefreshTokenFailed',
  props<{ response: DataResponse<LoginData> }>()
);

export const RefreshTokenFailedActionReducer = on(
  RefreshTokenFailed,
  (state: any, { response }) => {
    return {
      ...state,
      refreshToken: {
        ...state?.refreshToken,
        main: {
          ...state?.refreshToken?.main,
          ...response,
        },
      },
    };
  }
);

export const RefreshTokenFailedInteractionActionReducer = on(
  RefreshTokenFailed,
  (state: any, { response }) => {
    return {
      ...state,
      refreshToken: {
        ...state?.refreshToken,
        main: {
          ...state?.refreshToken?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
