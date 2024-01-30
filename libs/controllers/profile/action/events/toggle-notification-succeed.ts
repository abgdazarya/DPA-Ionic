import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ToggleNotificationData } from '../../models/toggle-notification';

export const ToggleNotificationSucceed = createAction(
  'Services.Profile.Events.ToggleNotificationSucceed',
  props<{ response: DataResponse<ToggleNotificationData> }>()
);

export const ToggleNotificationSucceedActionReducer = on(
  ToggleNotificationSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      toggleNotification: {
        ...state?.toggleNotification,
        data,
      },
    };
  }
);

export const ToggleNotificationSucceedInteractionActionReducer = on(
  ToggleNotificationSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      toggleNotification: {
        ...state?.toggleNotification,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
