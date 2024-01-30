import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { CreatePinData } from '../../models/create-pin-data';

export const GetSampleFailed = createAction(
  'Services.Auth.Events.GetSampleFailed',
  props<{ response: DataResponse<CreatePinData> }>()
);

export const GetSampleFailedActionReducer = on(
  GetSampleFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetSampleFailedInteractionActionReducer = on(
  GetSampleFailed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      sample: {
        ...state?.sample,
        code,
        success: null,
        error: message,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
