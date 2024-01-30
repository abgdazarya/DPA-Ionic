import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ToggleBiometricData } from '../../models/toggle-biometric';

export const ToggleBiometricFailed = createAction(
  'Services.Profile.Events.ToggleBiometricFailed',
  props<{ response: DataResponse<ToggleBiometricData> }>()
);

export const ToggleBiometricFailedActionReducer = on(
  ToggleBiometricFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const ToggleBiometricFailedInteractionActionReducer = on(
  ToggleBiometricFailed,
  (state: any) => {
    return {
      ...state,
      toogleBiometric: {
        ...state?.toogleBiometric,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
