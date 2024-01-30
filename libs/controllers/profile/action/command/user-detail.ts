import { createAction, on, props } from '@ngrx/store';
import { UserInfoDto } from '../../dtos/user-info.dto';
import { InteractionType } from '@shared';

export const UserDetail = createAction(
  'Services.Profile.Commands.GetUserDetail',
  props<{ payload: UserInfoDto; async?: boolean }>()
);

export const UserDetailReset = createAction(
  'Services.Profile.Commands.GetUserDetailReset',
  props<{ response: any; async?: boolean }>()
);

export const UserDetailInteractionReset = createAction(
  'Services.Profile.Commands.GetUserDetailResetInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const UserDetailActionReducer = on(UserDetail, (state: any) => {
  return {
    ...state,
  };
});

export const UserDetailActionResetReducer = on(
  UserDetailReset,
  (state: any, { response }) => {
    return {
      ...state,
      userDetail: {
        ...state?.userDetail,
        ...response,
      },
    };
  }
);

export const UserDetailInteractionActionReducer = on(
  UserDetail,
  (state: any) => {
    return {
      ...state,
      userDetail: {
        ...state?.userDetail,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const UserDetailInteractionActionResetReducer = on(
  UserDetailInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      userDetail: {
        ...state?.userDetail,
        ...response,
      },
    };
  }
);
