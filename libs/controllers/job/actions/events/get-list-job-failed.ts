import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { JobModel } from '../../models/job.model';

export const GetListJobFailed = createAction(
  'Services.Menu.Job.Events.GetListJobFailed',
  props<{
    response: DataResponsePagination<JobModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'recommendation';
  }>()
);

export const GetListJobFailedActionReducer = on(
  GetListJobFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        response: {
          ...response,
          data: state?.[dataType].data,
        },
        // ...response,
      },
    };
  }
);

export const GetListJobFailedInteractionActionReducer = on(
  GetListJobFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
