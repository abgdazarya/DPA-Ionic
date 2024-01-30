import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { FriendList } from '../../models/friendlist.model';

export const GetFriendListSucceed = createAction(
  'Services.Menu.Events.GetFriendListSucceed',
  props<{
    response: DataResponsePagination<FriendList>;
  }>()
);

export const GetFriendListSucceedActionReducer = on(
  GetFriendListSucceed,
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

export const GetFriendListSucceedInteractionActionReducer = on(
  GetFriendListSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      friendList: {
        ...state?.friendList,
        list: {
          ...state?.friendList?.list,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
