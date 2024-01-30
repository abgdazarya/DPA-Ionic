import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { Job } from '../../models/job.model';

export const GetDetailJobFailed = createAction(
  'Services.Menu.Events.GetDetailJobFailed',
  props<{ response: DataResponse<Job> }>()
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
      job: {
        ...state?.job,
        detail: {
          ...state?.job?.detail,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
