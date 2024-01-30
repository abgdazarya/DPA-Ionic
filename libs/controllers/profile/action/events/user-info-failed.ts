import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { BaseProfile } from '../../models/profile';

export const UserInfoFailed = createAction(
  'Services.Profile.Events.GetUserProfileFailed',
  props<{
    response: DataResponse<BaseProfile>;
    clearData?: boolean;
    from?: string;
  }>()
);

export const UserInfoFailedActionReducer = on(
  UserInfoFailed,
  (state: any, { clearData, from }) => {
    if (clearData) {
      return {
        ...state,
        userInfo: {
          ...state?.userInfo,
          data: undefined,
        },
      };
    }

    return {
      ...state,
    };
  }
);

export const UserInfoFailedInteractionActionReducer = on(
  UserInfoFailed,
  (state: any) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
