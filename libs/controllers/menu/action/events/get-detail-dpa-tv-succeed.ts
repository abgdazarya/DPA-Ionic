import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { DpaTv } from '../../models/dpa-tv.model';

export const GetDetailDpaTvSucceed = createAction(
  'Services.Menu.Events.GetDetailDpaTvSucceed',
  props<{ response: DataResponse<DpaTv> }>()
);

export const GetDetailDpaTvSucceedActionReducer = on(
  GetDetailDpaTvSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        detail: {
          ...state?.dpaTv?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailDpaTvSucceedInteractionActionReducer = on(
  GetDetailDpaTvSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        detail: {
          ...state?.dpaTv?.detail,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
