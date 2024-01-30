import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AllKontenRuangPensiun } from '../../models/all-konten-ruang-pensiun.model';

export const ManageAllKontenFailed = createAction(
  'Services.Menu.Events.ManageAllKontenFailed',
  props<{
    response: DataResponse<AllKontenRuangPensiun>;
  }>()
);

export const ManageAllKontenFailedActionReducer = on(
  ManageAllKontenFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const ManageAllKontenFailedInteractionActionReducer = on(
  ManageAllKontenFailed,
  (state: any, { response }) => {
    return {
      ...state,
      allKontenRuangPensiun: {
        ...state?.allKontenRuangPensiun,
        manage: {
          ...state?.allKontenRuangPensiun?.manage,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
