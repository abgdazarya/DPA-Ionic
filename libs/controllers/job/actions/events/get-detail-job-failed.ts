import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { JobModel } from '../../models/job.model';

export const GetDetailJobFailed = createAction(
  'Services.Menu.Job.Events.GetDetailJobFailed',
  props<{ response: DataResponse<JobModel> }>()
);

export const GetDetailJobFailedActionReducer = on(
  GetDetailJobFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailJobFailedInteractionActionReducer = on(
  GetDetailJobFailed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
