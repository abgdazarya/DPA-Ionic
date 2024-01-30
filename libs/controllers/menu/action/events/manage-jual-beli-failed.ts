import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { JualBeliRuangPensiun } from '../../models/jual-beli-ruang-pensiun.model';

export const ManageJualBeliFailed = createAction(
  'Services.Menu.Events.ManageJualBeliFailed',
  props<{
    response: DataResponse<JualBeliRuangPensiun>;
  }>()
);

export const ManageJualBeliFailedActionReducer = on(
  ManageJualBeliFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const ManageJualBeliFailedInteractionActionReducer = on(
  ManageJualBeliFailed,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        manage: {
          ...state?.jualBeliRuangPensiun?.manage,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
