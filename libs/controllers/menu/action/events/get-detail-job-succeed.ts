import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { Job } from '../../models/job.model';

export const GetDetailJobSucceed = createAction(
  'Services.Menu.Events.GetDetailJobSucceed',
  props<{ response: DataResponse<Job> }>()
);

export const GetDetailJobSucceedActionReducer = on(
  GetDetailJobSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        detail: {
          ...state?.job?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailJobSucceedInteractionActionReducer = on(
  GetDetailJobSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        detail: {
          ...state?.job?.detail,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
