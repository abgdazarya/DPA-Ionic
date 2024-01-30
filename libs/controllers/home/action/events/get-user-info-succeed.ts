import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { UserInfo } from '../../models/user-info.model';

export const GetUserInfoSucceed = createAction(
  'Services.Auth.Events.GetUserInfoSucceed',
  props<{ response: DataResponse<UserInfo> }>()
);

export const GetUserInfoSucceedActionReducer = on(
  GetUserInfoSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        main: {
          ...state?.userInfo?.main,
          ...response,
        },
      },
    };
  }
);

export const GetUserInfoSucceedInteractionActionReducer = on(
  GetUserInfoSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        main: {
          ...state?.userInfo?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
