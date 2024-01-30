import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { DpaTvModel } from '../../models/dpa-tv.model';

export const GetListDpaTvFailed = createAction(
  'Services.Menu.DpaTv.Events.GetListDpaTvFailed',
  props<{
    response: DataResponsePagination<DpaTvModel>;
    dataType: 'landing' | 'list' | 'footer';
  }>()
);

export const GetListDpaTvFailedActionReducer = on(
  GetListDpaTvFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        // ...response,
        response: {
          ...response,
          data: state?.[dataType].data,
        },
      },
    };
  }
);

export const GetListDpaTvFailedInteractionActionReducer = on(
  GetListDpaTvFailed,
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
