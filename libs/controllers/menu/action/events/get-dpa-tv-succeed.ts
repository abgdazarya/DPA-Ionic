import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { DpaTv } from '../../models/dpa-tv.model';

export const GetDpaTvSucceed = createAction(
  'Services.Menu.Events.GetDpaTvSucceed',
  props<{
    response: DataResponsePagination<DpaTv>;
    dataType: 'landing' | 'list' | 'footer';
  }>()
);

export const GetDpaTvSucceedActionReducer = on(
  GetDpaTvSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        [dataType]: {
          ...state?.dpaTv?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetDpaTvSucceedInteractionActionReducer = on(
  GetDpaTvSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        [dataType]: {
          ...state?.dpaTv?.[dataType],
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
