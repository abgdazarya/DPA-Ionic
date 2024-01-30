import { createAction, on, props } from '@ngrx/store';
import { UserInfoDto } from '../../dtos/user-info.dto';
import { InteractionType } from '@shared';

export const UserInfo = createAction(
  'Services.Profile.Commands.GetUserProfile',
  props<{ payload: UserInfoDto; async?: boolean }>()
);

export const UserInfoReset = createAction(
  'Services.Profile.Commands.GetUserProfileReset',
  props<{ response: any; async?: boolean }>()
);

export const UserInfoInteractionReset = createAction(
  'Services.Profile.Commands.GetUserProfileResetInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const UserInfoActionReducer = on(UserInfo, (state: any) => {
  return {
    ...state,
  };
});

export const UserInfoActionResetReducer = on(
  UserInfoReset,
  (state: any, { response }) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        ...response,
      },
    };
  }
);

export const UserInfoInteractionActionReducer = on(UserInfo, (state: any) => {
  return {
    ...state,
    userInfo: {
      ...state?.userInfo,
      type: InteractionType.PROCESS,
      isLoading: true,
    },
  };
});

export const UserInfoInteractionActionResetReducer = on(
  UserInfoInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        ...response,
      },
    };
  }
);
