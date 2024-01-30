import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { DpaTv } from '../../models/dpa-tv.model';

export const GetDetailDpaTvFailed = createAction(
  'Services.Menu.Events.GetDetailDpaTvFailed',
  props<{ response: DataResponse<DpaTv> }>()
);

export const GetDetailDpaTvFailedActionReducer = on(
  GetDetailDpaTvFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailDpaTvFailedInteractionActionReducer = on(
  GetDetailDpaTvFailed,
  (state: any, { response }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        detail: {
          ...state?.dpaTv?.detail,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
