import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { Sample } from '../../models/sample-data';

export const GetSampleSucceed = createAction(
  'Services.Auth.Events.GetSampleSucceed',
  props<{ response: DataResponse<Sample[]> }>()
);

export const GetSampleSucceedActionReducer = on(
  GetSampleSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      sample: {
        ...state?.sample,
        data,
      },
    };
  }
);

export const GetSampleSucceedInteractionActionReducer = on(
  GetSampleSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      sample: {
        ...state?.sample,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
