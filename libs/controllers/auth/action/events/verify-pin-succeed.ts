import { createAction, on, props } from '@ngrx/store';
import { VerifyPinData } from '../../models/verify-pin-data';
import { DataResponse, InteractionType } from '@shared';

export const VerifyPinSucceed = createAction(
  'Services.Auth.Events.VerifyPinSucceed',
  props<{ response: DataResponse<VerifyPinData> }>()
);

export const VerifyPinSucceedActionReducer = on(
  VerifyPinSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyPin: {
        ...state?.verifyPin,
        main: {
          ...state?.verifyPin?.main,
          ...response,
        },
      },
    };
  }
);

export const VerifyPinSucceedInteractionActionReducer = on(
  VerifyPinSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      verifyPin: {
        ...state?.verifyPin,
        main: {
          ...state?.verifyPin?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
