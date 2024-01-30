import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { DpaTvModel } from '../../models/dpa-tv.model';

export const GetDetailDpaTvFailed = createAction(
  'Services.Menu.DpaTv.Events.GetDetailDpaTvFailed',
  props<{ response: DataResponse<DpaTvModel> }>()
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
      detail: {
        ...state?.detail,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
