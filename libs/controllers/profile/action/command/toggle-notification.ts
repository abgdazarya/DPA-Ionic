import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { ToggleNotifDto } from '../../dtos/toggle-notification.dto';

export const ToggleNotification = createAction(
  'Services.Profile.Commands.ToggleNotification',
  props<{ payload: ToggleNotifDto; async?: boolean }>()
);

export const ToggleNotificationActionReducer = on(ToggleNotification, (state: any) => {
  return {
    ...state,
  };
});

export const ToggleNotificationInteractionActionReducer = on(ToggleNotification, (state: any) => {
  return {
    ...state,
   toggleNotification: {
      ...state?.toggleNotification,
      type: InteractionType.PROCESS,
      isLoading: true,
    },
  };
});
