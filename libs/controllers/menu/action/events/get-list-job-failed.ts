import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { Job } from '../../models/job.model';

export const GetListJobFailed = createAction(
  'Services.Menu.Events.GetListJobFailed',
  props<{
    response: DataResponsePagination<Job>;
    dataType: 'landing' | 'list' | 'recommendation';
  }>()
);

export const GetListJobFailedActionReducer = on(
  GetListJobFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetListJobFailedInteractionActionReducer = on(
  GetListJobFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        [dataType]: {
          ...state?.job?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
