import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetUserInfo = createAction(
  'Services.Home.Commands.GetUserInfo',
  props<{ payload: any; async?: boolean }>()
);

export const GetUserInfoReset = createAction(
  'Services.Home.Commands.GetUserInfoReset',
  props<{ response: any; async?: boolean }>()
);

export const GetUserInfoInteractionReset = createAction(
  'Services.Home.Commands.GetUserInfoInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetUserInfoActionReducer = on(GetUserInfo, (state: any) => {
  return {
    ...state,
  };
});

export const GetUserInfoActionResetReducer = on(
  GetUserInfoReset,
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

export const GetUserInfoInteractionActionReducer = on(
  GetUserInfo,
  (state: any) => {
    return {
      ...state,
      userInfo: {
        ...state?.userInfo,
        main: {
          ...state?.userInfo?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetUserInfoInteractionActionResetReducer = on(
  GetUserInfoInteractionReset,
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
