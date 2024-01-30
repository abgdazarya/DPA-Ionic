import { INITIAL_STATE, createAction, on, props } from '@ngrx/store';
import { UserInfoDto } from '../../dtos/user-info.dto';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';

export const Notification = createAction(
  'Services.Profile.Commands.GetNotification',
  props<{
    payload: UserInfoDto;
    dataType: 'header' | 'list';
    async?: boolean;
    append?: boolean;
  }>()
);

export const ResetNotification = createAction(
  'Services.Profile.Commands.ResetNotification',
  props<{ dataType: 'header' | 'list'; async?: boolean }>()
);

export const ResetNotificationActionReducer = on(
  ResetNotification,
  (state: any, { dataType }) => {
    return {
      ...state,
      notification: {
        ...state.notification,
        [dataType]: {
          ...INITIAL_STATE,
          ...INITIAL_INTERACTION_STATE,
        },
      },
    };
  }
);

export const ResetNotificationInteractionActionReducer = on(
  ResetNotification,
  (state: any, { dataType }) => {
    return {
      ...state,
      notification: {
        ...state.notification,
        [dataType]: {
          ...INITIAL_STATE,
          ...INITIAL_INTERACTION_STATE,
        },
      },
    };
  }
);

export const NotificationActionReducer = on(Notification, (state: any) => {
  return {
    ...state,
  };
});

export const NotificationInteractionActionReducer = on(
  Notification,
  (state: any, { dataType }) => {
    return {
      ...state,
      notification: {
        ...state.notification,
        [dataType]: {
          ...state?.notification?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);
