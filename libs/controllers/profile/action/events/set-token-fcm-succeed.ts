import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { SetTokenFcm } from '../../models/set-token-fcm';

export const SetTokenFcmSucceed = createAction(
  'Services.Profile.Events.SetTokenFcmSucceed',
  props<{ response: DataResponse<SetTokenFcm> }>()
);

export const SetTokenFcmSucceedActionReducer = on(
  SetTokenFcmSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      setTokenFcm: {
        ...state?.setTokenFcm,
        data,
      },
    };
  }
);

export const SetTokenFcmSucceedInteractionActionReducer = on(
  SetTokenFcmSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      setTokenFcm: {
        ...state?.setTokenFcm,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
