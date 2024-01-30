import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { VerifyPinData } from '../../models/verify-pin-data';

export const VerifyPinFailed = createAction(
  'Services.Auth.Events.VerifyPinFailed',
  props<{ response: DataResponse<VerifyPinData> }>()
);

export const VerifyPinFailedActionReducer = on(
  VerifyPinFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const VerifyPinFailedInteractionActionReducer = on(
  VerifyPinFailed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyPin: {
        ...state?.verifyPin,
        main: {
          ...state?.verifyPin?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
