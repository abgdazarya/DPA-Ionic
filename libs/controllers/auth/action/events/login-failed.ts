import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LoginData } from '../../models/login-data';

export const LoginFailed = createAction(
  'Services.Auth.Events.LoginFailed',
  props<{ response: DataResponse<LoginData> }>()
);

export const LoginFailedActionReducer = on(LoginFailed, (state: any) => {
  return {
    ...state,
  };
});

export const LoginFailedInteractionActionReducer = on(
  LoginFailed,
  (state: any, { response }) => {
    return {
      ...state,
      login: {
        ...state?.login,
        main: {
          ...state?.login?.main,
          ...response,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
