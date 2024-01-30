import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { BaseProfile } from '../../models/profile';

export const UserInfoSucceed = createAction(
  'Services.Profile.Events.GetUserProfileSucceed',
  props<{ response: DataResponse<BaseProfile> }>()
);

export const UserInfoSucceedActionReducer = on(
  UserInfoSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        data,
      },
    };
  }
);

export const UserInfoSucceedInteractionActionReducer = on(
  UserInfoSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
