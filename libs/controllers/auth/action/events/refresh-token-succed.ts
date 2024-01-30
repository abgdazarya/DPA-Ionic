import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { RefreshTokenData } from '../../models/refresh-token-data';

export const RefreshTokenSucceed = createAction(
  'Services.Auth.Events.RefreshTokenSucceed',
  props<{ response: DataResponse<RefreshTokenData> }>()
);

export const RefreshTokenSucceedActionReducer = on(
  RefreshTokenSucceed,
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

export const RefreshTokenSucceedInteractionActionReducer = on(
  RefreshTokenSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      refreshToken: {
        ...state?.refreshToken,
        main: {
          ...state?.refreshToken?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
