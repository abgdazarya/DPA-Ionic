import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { GetTokenDto } from '../../dtos/get-token.dto';

export const GetToken = createAction(
  'Services.Auth.Commands.GetToken',
  props<{ payload: GetTokenDto; async?: boolean }>()
);

export const GetTokenReset = createAction(
  'Services.Auth.Commands.GetTokenReset',
  props<{ response: any; async?: boolean }>()
);

export const GetTokenInteractionReset = createAction(
  'Services.Auth.Commands.GetTokenInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetTokenActionReducer = on(GetToken, (state: any) => {
  return {
    ...state,
  };
});

export const GetTokenActionResetReducer = on(
  GetTokenReset,
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

export const GetTokenInteractionActionReducer = on(GetToken, (state: any) => {
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

export const GetTokenInteractionActionResetReducer = on(
  GetTokenInteractionReset,
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
