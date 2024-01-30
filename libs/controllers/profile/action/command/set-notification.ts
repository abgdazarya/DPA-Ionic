import { createAction, on, props } from '@ngrx/store';
import { UserInfoDto } from '../../dtos/user-info.dto';
import { InteractionType } from '@shared';
import { ProfileDto } from '../../dtos/profile.dto';
import { ReadNotifDto } from '../../dtos/read-notification.dto';

export const SetNotification = createAction(
  'Services.Profile.Commands.SetNotification',
  props<{ payload: ReadNotifDto; async?: boolean }>()
);

export const SetNotificationActionReducer = on(
  SetNotification,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const SetNotificationInteractionActionReducer = on(
  SetNotification,
  (state: any) => {
    return {
      ...state,
      readNotification: {
        ...state?.readNotification,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);
