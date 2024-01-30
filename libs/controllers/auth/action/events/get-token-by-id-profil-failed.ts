import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LoginData } from '../../models/login-data';

export const GetTokenByIdProfilFailed = createAction(
  'Services.Auth.Events.GetTokenByIdProfilFailed',
  props<{ response: DataResponse<LoginData> }>()
);

export const GetTokenByIdProfilFailedActionReducer = on(
  GetTokenByIdProfilFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetTokenByIdProfilFailedInteractionActionReducer = on(
  GetTokenByIdProfilFailed,
  (state: any, { response }) => {
    return {
      ...state,
      login: {
        ...state?.login,
        main: {
          ...state?.login?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
