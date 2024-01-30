import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { DpaTvModel } from '../../models/dpa-tv.model';

export const GetDetailDpaTvSucceed = createAction(
  'Services.Menu.DpaTv.Events.GetDetailDpaTvSucceed',
  props<{ response: DataResponse<DpaTvModel> }>()
);

export const GetDetailDpaTvSucceedActionReducer = on(
  GetDetailDpaTvSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);

export const GetDetailDpaTvSucceedInteractionActionReducer = on(
  GetDetailDpaTvSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
