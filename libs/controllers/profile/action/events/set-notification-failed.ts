import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ReadNotification } from '../../models/read-notification';

export const SetNotificationFailed = createAction(
  'Services.Profile.Events.SetNotificationFailed',
  props<{ response: DataResponse<ReadNotification> }>()
);

export const SetNotificationFailedActionReducer = on(SetNotificationFailed, (state: any) => {
  return {
    ...state,
  };
});

export const SetNotificationFailedInteractionActionReducer = on(
  SetNotificationFailed,
  (state: any) => {
    return {
      ...state,
      readNotification: {
        ...state?.readNotification,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
