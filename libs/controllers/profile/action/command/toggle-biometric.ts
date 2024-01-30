import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { ToggleBiometricDto } from '../../dtos/toggle-biometric.dto';

export const ToggleBiometric = createAction(
  'Services.Profile.Commands.ToggleBiometric',
  props<{ payload: ToggleBiometricDto; async?: boolean }>()
);

export const ToggleBiometricActionReducer = on(
  ToggleBiometric,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const ToggleBiometricInteractionActionReducer = on(
  ToggleBiometric,
  (state: any) => {
    return {
      ...state,
      toggleBiometric: {
        ...state?.toggleBiometric,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);
