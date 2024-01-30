import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { FriendList } from '../../models/friendlist.model';

export const GetFriendListFailed = createAction(
  'Services.Menu.Events.GetFriendListFailed',
  props<{
    response: DataResponsePagination<FriendList>;
  }>()
);

export const GetFriendListFailedActionReducer = on(
  GetFriendListFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetFriendListFailedInteractionActionReducer = on(
  GetFriendListFailed,
  (state: any, { response }) => {
    return {
      ...state,
      friendList: {
        ...state?.friendList,
        list: {
          ...state?.friendList?.list,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
