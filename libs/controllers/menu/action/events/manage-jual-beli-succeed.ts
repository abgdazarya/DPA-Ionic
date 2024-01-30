import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { JualBeliRuangPensiun } from '../../models/jual-beli-ruang-pensiun.model';

export const ManageJualBeliSucceed = createAction(
  'Services.Menu.Events.ManageJualBeliSucceed',
  props<{
    response: DataResponse<JualBeliRuangPensiun>;
  }>()
);

export const ManageJualBeliSucceedActionReducer = on(
  ManageJualBeliSucceed,
  (state: any, { response }) => {
    return {
      ...state,
    };
  }
);

export const ManageJualBeliSucceedInteractionActionReducer = on(
  ManageJualBeliSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        manage: {
          ...state?.jualBeliRuangPensiun?.manage,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
