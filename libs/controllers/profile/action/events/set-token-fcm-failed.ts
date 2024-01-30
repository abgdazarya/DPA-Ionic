import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { SetTokenFcm } from '../../models/set-token-fcm';

export const SetTokenFcmFailed = createAction(
  'Services.Profile.Events.SetTokenFcmFailed',
  props<{ response: DataResponse<SetTokenFcm> }>()
);

export const SetTokenFcmFailedActionReducer = on(SetTokenFcmFailed, (state: any) => {
  return {
    ...state,
  };
});

export const SetTokenFcmFailedInteractionActionReducer = on(
  SetTokenFcmFailed,
  (state: any) => {
    return {
      ...state,
      setTokenFcm: {
        ...state?.setTokenFcm,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
