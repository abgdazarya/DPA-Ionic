import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { NotificationData } from '../../models/notification';

export const NotificationFailed = createAction(
  'Services.Profile.Events.GetNotificationFailed',
  props<{
    response: DataResponsePagination<NotificationData>;
    dataType: 'header' | 'list';
  }>()
);

export const NotificationFailedActionReducer = on(
  NotificationFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      notification: {
        ...state.notification,
        [dataType]: {
          ...state?.notification?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const NotificationFailedInteractionActionReducer = on(
  NotificationFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      notification: {
        ...state.notification,
        [dataType]: {
          ...state?.notification?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
