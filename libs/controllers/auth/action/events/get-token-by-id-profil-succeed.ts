import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LoginData } from '../../models/login-data';

export const GetTokenByIdProfilSucceed = createAction(
  'Services.Auth.Events.GetTokenByIdProfilSucceed',
  props<{ response: DataResponse<LoginData> }>()
);

export const GetTokenByIdProfilSucceedActionReducer = on(
  GetTokenByIdProfilSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      login: {
        ...state?.login,
        main: {
          ...state?.login?.main,
          ...response,
        },
      },
    };
  }
);

export const GetTokenByIdProfilSucceedInteractionActionReducer = on(
  GetTokenByIdProfilSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      login: {
        ...state?.login,
        main: {
          ...state?.login?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
