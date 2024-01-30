import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { BaseProfile, DetailProfile } from '../../models/profile';
import { ReadNotification } from '../../models/read-notification';

export const SetNotificationSucceed = createAction(
  'Services.Profile.Events.SetNotificationSucceed',
  props<{ response: DataResponse<ReadNotification> }>()
);

export const SetNotificationSucceedActionReducer = on(
  SetNotificationSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      readNotification: {
        ...state?.readNotification,
        data,
      },
    };
  }
);

export const SetNotificationSucceedInteractionActionReducer = on(
  SetNotificationSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      readNotification: {
        ...state?.readNotification,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
