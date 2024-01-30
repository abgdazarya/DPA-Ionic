import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { BaseProfile } from '../../models/profile';

export const UserDetailFailed = createAction(
  'Services.Profile.Events.GetUserDetailFailed',
  props<{ response: DataResponse<BaseProfile> }>()
);

export const UserDetailFailedActionReducer = on(UserDetailFailed, (state: any) => {
  return {
    ...state,
  };
});

export const UserDetailFailedInteractionActionReducer = on(
  UserDetailFailed,
  (state: any) => {
    return {
      ...state,
      userDetail: {
        ...state?.userDetail,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
