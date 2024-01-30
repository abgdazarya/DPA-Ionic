import { createAction, on, props } from '@ngrx/store';
import {
  DataResponsePagination,
  InteractionType,
  dataComparable,
} from '@shared';
import { JobModel } from '../../models/job.model';

export const GetListJobSucceed = createAction(
  'Services.Menu.Job.Events.GetListJobSucceed',
  props<{
    response: DataResponsePagination<JobModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'recommendation';
  }>()
);

const extractData = (
  current: DataResponsePagination<JobModel>,
  newest: DataResponsePagination<JobModel>
): DataResponsePagination<JobModel> => {
  if (newest?.data?.data) {
    if (current?.data?.data) {
      const data: JobModel[] = dataComparable(
        [...current.data.data],
        [...newest?.data?.data],
        'idJob'
      );
      current = {
        ...newest,
        data: {
          ...newest.data,
          data: data,
        },
      };
    } else {
      current = newest;
    }
  }
  return current;
};

export const GetListJobSucceedActionReducer = on(
  GetListJobSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        ...extractData(state?.[dataType], response),
      },
    };
  }
);

export const GetListJobSucceedInteractionActionReducer = on(
  GetListJobSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
