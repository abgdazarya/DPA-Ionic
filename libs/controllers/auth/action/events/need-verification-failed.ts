import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { NeedVerificationData } from '../../models/need-verification-data';

export const NeedVerificationFailed = createAction(
  'Services.Auth.Events.NeedVerificationFailed',
  props<{ response: DataResponse<NeedVerificationData> }>()
);

export const NeedVerificationFailedActionReducer = on(
  NeedVerificationFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const NeedVerificationFailedInteractionActionReducer = on(
  NeedVerificationFailed,
  (state: any, { response }) => {
    return {
      ...state,
      needVerification: {
        ...state?.needVerification,
        main: {
          ...state?.needVerification?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
