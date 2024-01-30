import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LoginData } from '../../models/login-data';

export const GetTokenSucceed = createAction(
  'Services.Auth.Events.GetTokenSucceed',
  props<{ response: DataResponse<LoginData> }>()
);

export const GetTokenSucceedActionReducer = on(
  GetTokenSucceed,
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

export const GetTokenSucceedInteractionActionReducer = on(
  GetTokenSucceed,
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
          isLoading: true,
        },
      },
    };
  }
);
