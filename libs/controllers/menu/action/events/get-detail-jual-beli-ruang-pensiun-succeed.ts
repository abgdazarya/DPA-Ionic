import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { JualBeliRuangPensiun } from '../../models/jual-beli-ruang-pensiun.model';

export const GetDetailJualBeliRuangPensiunSucceed = createAction(
  'Services.Menu.Events.GetDetailJualBeliRuangPensiunSucceed',
  props<{ response: DataResponse<JualBeliRuangPensiun> }>()
);

export const GetDetailJualBeliRuangPensiunSucceedActionReducer = on(
  GetDetailJualBeliRuangPensiunSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        detail: {
          ...state?.jualBeliRuangPensiun?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailJualBeliRuangPensiunSucceedInteractionActionReducer = on(
  GetDetailJualBeliRuangPensiunSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        detail: {
          ...state?.jualBeliRuangPensiun?.detail,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
