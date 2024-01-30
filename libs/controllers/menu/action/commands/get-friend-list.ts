import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetFriendList = createAction(
  'Services.Menu.Commands.GetFriendList',
  props<{
    payload: any;
    async?: boolean;
  }>()
);

export const GetFriendListReset = createAction(
  'Services.Menu.Commands.GetFriendListReset',
  props<{
    response: any;

    async?: boolean;
  }>()
);

export const GetFriendListInteractionReset = createAction(
  'Services.Menu.Commands.GetFriendListInteractionReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetFriendListActionReducer = on(
  GetFriendList,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetFriendListActionResetReducer = on(
  GetFriendListReset,
  (state: any, { response }) => {
    return {
      ...state,
      friendList: {
        ...state?.friendList,
        list: {
          ...state?.friendList?.list,
          ...response,
        },
      },
    };
  }
);

export const GetFriendListInteractionActionReducer = on(
  GetFriendList,
  (state: any, {}) => {
    return {
      ...state,
      friendList: {
        ...state?.friendList,
        list: {
          ...state?.friendList?.list,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetFriendListInteractionActionResetReducer = on(
  GetFriendListInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      friendList: {
        ...state?.friendList,
        list: {
          ...state?.friendList?.list,
          ...response,
        },
      },
    };
  }
);
