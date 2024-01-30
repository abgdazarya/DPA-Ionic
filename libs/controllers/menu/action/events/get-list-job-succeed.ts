import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { Job } from '../../models/job.model';

export const GetListJobSucceed = createAction(
  'Services.Menu.Events.GetListJobSucceed',
  props<{
    response: DataResponsePagination<Job>;
    dataType: 'landing' | 'list' | 'recommendation';
  }>()
);

export const GetListJobSucceedActionReducer = on(
  GetListJobSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        [dataType]: {
          ...state?.job?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetListJobSucceedInteractionActionReducer = on(
  GetListJobSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        [dataType]: {
          ...state?.job?.[dataType],
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
