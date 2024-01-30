import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { NeedVerificationData } from '../../models/need-verification-data';

export const NeedVerificationSucceed = createAction(
  'Services.Auth.Events.NeedVerificationSucceed',
  props<{ response: DataResponse<NeedVerificationData> }>()
);

export const NeedVerificationSucceedActionReducer = on(
  NeedVerificationSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      needVerification: {
        ...state?.needVerification,
        main: {
          ...state?.needVerification?.main,
          ...response,
        },
      },
    };
  }
);

export const NeedVerificationSucceedInteractionActionReducer = on(
  NeedVerificationSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      needVerification: {
        ...state?.needVerification,
        main: {
          ...state?.needVerification?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
