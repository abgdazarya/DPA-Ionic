import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ReadNotification } from '../../models/read-notification';
import { ToggleNotificationData } from '../../models/toggle-notification';

export const ToggleNotificationFailed = createAction(
  'Services.Profile.Events.ToggleNotificationFailed',
  props<{ response: DataResponse<ToggleNotificationData> }>()
);

export const ToggleNotificationFailedActionReducer = on(ToggleNotificationFailed, (state: any) => {
  return {
    ...state,
  };
});

export const ToggleNotificationFailedInteractionActionReducer = on(
  ToggleNotificationFailed,
  (state: any) => {
    return {
      ...state,
      toggleNotification: {
        ...state?.toggleNotification,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
