import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { JualBeliRuangPensiun } from '../../models/jual-beli-ruang-pensiun.model';

export const GetDetailJualBeliRuangPensiunFailed = createAction(
  'Services.Menu.Events.GetDetailJualBeliRuangPensiunFailed',
  props<{ response: DataResponse<JualBeliRuangPensiun> }>()
);

export const GetDetailJualBeliRuangPensiunFailedActionReducer = on(
  GetDetailJualBeliRuangPensiunFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailJualBeliRuangPensiunFailedInteractionActionReducer = on(
  GetDetailJualBeliRuangPensiunFailed,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        detail: {
          ...state?.jualBeliRuangPensiun?.detail,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
