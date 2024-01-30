import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AllKontenRuangPensiun } from '../../models/all-konten-ruang-pensiun.model';

export const ManageAllKontenSucceed = createAction(
  'Services.Menu.Events.ManageAllKontenSucceed',
  props<{
    response: DataResponse<AllKontenRuangPensiun>;
  }>()
);

export const ManageAllKontenSucceedActionReducer = on(
  ManageAllKontenSucceed,
  (state: any, { response }) => {
    return {
      ...state,
    };
  }
);

export const ManageAllKontenSucceedInteractionActionReducer = on(
  ManageAllKontenSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      allKontenRuangPensiun: {
        ...state?.allKontenRuangPensiun,
        manage: {
          ...state?.allKontenRuangPensiun?.manage,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
