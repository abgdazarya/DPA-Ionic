import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { BaseProfile } from '../../models/profile';
import { StorageService } from 'libs/services/common/storage.service';

export const UserDetailSucceed = createAction(
  'Services.Profile.Events.GetUserDetailSucceed',
  props<{ response: DataResponse<BaseProfile> }>()
);

export const UserDetailSucceedActionReducer = on(
  UserDetailSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      userDetail: {
        ...state?.userDetail,
        data,
      },
    };
  }
);

export const UserDetailSucceedInteractionActionReducer = on(
  UserDetailSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      userDetail: {
        ...state?.userDetail,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
