import { createAction, on, props } from '@ngrx/store';
import {
  DataResponsePagination,
  InteractionType,
  dataComparable,
} from '@shared';
import { DpaTvModel } from '../../models/dpa-tv.model';

export const GetListDpaTvSucceed = createAction(
  'Services.Menu.Events.GetListDpaTvSucceed',
  props<{
    response: DataResponsePagination<DpaTvModel>;
    dataType: 'landing' | 'list' | 'footer';
  }>()
);

const extractData = (
  current: DataResponsePagination<DpaTvModel>,
  newest: DataResponsePagination<DpaTvModel>
): DataResponsePagination<DpaTvModel> => {
  if (newest?.data?.data) {
    if (current?.data?.data) {
      const data: DpaTvModel[] = dataComparable(
        current.data.data,
        newest?.data?.data,
        'idDpaTv'
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

export const GetListDpaTvSucceedActionReducer = on(
  GetListDpaTvSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        // ...response,
        ...extractData(state?.[dataType], response),
      },
    };
  }
);

export const GetListDpaTvSucceedInteractionActionReducer = on(
  GetListDpaTvSucceed,
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
