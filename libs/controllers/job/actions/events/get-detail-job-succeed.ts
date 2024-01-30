import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { JobModel } from '../../models/job.model';

export const GetDetailJobSucceed = createAction(
  'Services.Menu.Job.Events.GetDetailJobSucceed',
  props<{ response: DataResponse<JobModel> }>()
);

export const GetDetailJobSucceedActionReducer = on(
  GetDetailJobSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);

export const GetDetailJobSucceedInteractionActionReducer = on(
  GetDetailJobSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
