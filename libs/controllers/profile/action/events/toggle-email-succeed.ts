import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ToggleEmailData } from '../../models/toggle-email';

export const ToggleEmailSucceed = createAction(
  'Services.Profile.Events.ToggleEmailSucceed',
  props<{
    response: DataResponse<ToggleEmailData>;
    toggleType: 'google' | 'apple';
  }>()
);

export const ToggleEmailReset = createAction(
  'Services.Profile.Events.ToggleEmailReset',
  props<{
    response: DataResponse<ToggleEmailData>;
    toggleType: 'google' | 'apple';
  }>()
);

export const ToggleEmailSucceedActionReducer = on(
  ToggleEmailSucceed,
  (state: any, { response: { data }, toggleType }) => {
    return {
      ...state,
      toggleEmail: {
        ...state?.toggleEmail,
        [toggleType]: {
          ...state?.toggleEmail?.[toggleType],
          data,
        },
      },
    };
  }
);

export const ToggleEmailSucceedInteractionActionReducer = on(
  ToggleEmailSucceed,
  (state: any, { response: { code, message }, toggleType }) => {
    return {
      ...state,
      toggleEmail: {
        ...state?.toggleEmail,
        [toggleType]: {
          ...state?.toggleEmail?.[toggleType],
          code,
          success: message,
          error: null,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);

export const ToggleEmailResetActionReducer = on(
  ToggleEmailReset,
  (state: any, { response: { data }, toggleType }) => {
    return {
      ...state,
      toggleEmail: {
        ...state?.toggleEmail,
        [toggleType]: {
          ...state?.toggleEmail?.[toggleType],
          data,
        },
      },
    };
  }
);

export const ToggleEmailResetInteractionActionReducer = on(
  ToggleEmailReset,
  (state: any, { toggleType }) => {
    return {
      ...state,
      toggleEmail: {
        ...state?.toggleEmail,
        [toggleType]: {
          ...state?.toggleEmail?.[toggleType],
          code: null,
          success: null,
          error: null,
          type: InteractionType.IDLE,
          isLoading: false,
        },
      },
    };
  }
);
