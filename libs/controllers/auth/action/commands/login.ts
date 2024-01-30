import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { LoginDto } from '../../dtos/login.dto';

export const Login = createAction(
  'Services.Auth.Commands.Login',
  props<{ payload: LoginDto; async?: boolean }>()
);

export const LoginReset = createAction(
  'Services.Auth.Commands.LoginReset',
  props<{ response: any; async?: boolean }>()
);

export const LoginInteractionReset = createAction(
  'Services.Auth.Commands.LoginInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const LoginActionReducer = on(Login, (state: any) => {
  return {
    ...state,
  };
});

export const LoginActionResetReducer = on(
  LoginReset,
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

export const LoginInteractionActionReducer = on(Login, (state: any) => {
  return {
    ...state,
    login: {
      ...state?.login,
      main: {
        ...state?.login?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const LoginInteractionActionResetReducer = on(
  LoginInteractionReset,
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
