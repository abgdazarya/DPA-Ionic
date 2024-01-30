import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { UserInfo } from '../../models/user-info.model';

export const GetUserInfoFailed = createAction(
  'Services.Auth.Events.GetUserInfoFailed',
  props<{ response: DataResponse<UserInfo> }>()
);

export const GetUserInfoFailedActionReducer = on(
  GetUserInfoFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetUserInfoFailedInteractionActionReducer = on(
  GetUserInfoFailed,
  (state: any, { response }) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        main: {
          ...state?.userInfo?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
