import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ToggleEmailData } from '../../models/toggle-email';

export const ToggleEmailFailed = createAction(
  'Services.Profile.Events.ToggleEmailFailed',
  props<{
    response: DataResponse<ToggleEmailData>;
    toggleType: 'google' | 'apple';
  }>()
);

export const ToggleEmailFailedActionReducer = on(
  ToggleEmailFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const ToggleEmailFailedInteractionActionReducer = on(
  ToggleEmailFailed,
  (state: any, { response: { code, message }, toggleType }) => {
    return {
      ...state,
      toggleEmail: {
        ...state?.toggleEmail,
        [toggleType]: {
          ...state?.toggleEmail?.[toggleType],
          code,
          success: null,
          error: message,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
