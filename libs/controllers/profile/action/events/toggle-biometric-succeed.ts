import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ToggleBiometricData } from '../../models/toggle-biometric';

export const ToggleBiometricSucceed = createAction(
  'Services.Profile.Events.ToggleBiometricSucceed',
  props<{ response: DataResponse<ToggleBiometricData> }>()
);

export const ToggleBiometricSucceedActionReducer = on(
  ToggleBiometricSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      toggleBiometric: {
        ...state?.toggleBiometric,
        data,
      },
    };
  }
);

export const ToggleBiometricSucceedInteractionActionReducer = on(
  ToggleBiometricSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      toggleBiometric: {
        ...state?.toggleBiometric,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
