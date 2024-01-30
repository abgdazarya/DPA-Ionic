import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { DpaTv } from '../../models/dpa-tv.model';

export const GetDpaTvFailed = createAction(
  'Services.Menu.Events.GetDpaTvFailed',
  props<{
    response: DataResponsePagination<DpaTv>;
    dataType: 'landing' | 'list' | 'footer';
  }>()
);

export const GetDpaTvFailedActionReducer = on(
  GetDpaTvFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDpaTvFailedInteractionActionReducer = on(
  GetDpaTvFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        [dataType]: {
          ...state?.dpaTv?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
