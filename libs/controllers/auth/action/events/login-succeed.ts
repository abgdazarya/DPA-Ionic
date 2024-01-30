import { createAction, on, props } from '@ngrx/store';
import { LoginData } from '../../models/login-data';
import { DataResponse, InteractionType } from '@shared';

export const LoginSucceed = createAction(
  'Services.Auth.Events.LoginSucceed',
  props<{ response: DataResponse<LoginData> }>()
);

export const LoginSucceedActionReducer = on(
  LoginSucceed,
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

export const LoginSucceedInteractionActionReducer = on(
  LoginSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      login: {
        ...state?.login,
        main: {
          ...state?.login?.main,
          ...response,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
