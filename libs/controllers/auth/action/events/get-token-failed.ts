import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LoginData } from '../../models/login-data';

export const GetTokenFailed = createAction(
  'Services.Auth.Events.GetTokenFailed',
  props<{ response: DataResponse<LoginData> }>()
);

export const GetTokenFailedActionReducer = on(GetTokenFailed, (state: any) => {
  return {
    ...state,
  };
});

export const GetTokenFailedInteractionActionReducer = on(
  GetTokenFailed,
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
          isLoading: true,
        },
      },
    };
  }
);
