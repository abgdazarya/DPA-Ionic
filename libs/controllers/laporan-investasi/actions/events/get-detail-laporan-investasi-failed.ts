import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LaporanInvestasiModel } from '../../models/laporan-investasi.model';

export const GetDetailLaporanInvestasiFailed = createAction(
  'Services.Menu.LaporanInvestasi.Events.GetDetailLaporanInvestasiFailed',
  props<{ response: DataResponse<LaporanInvestasiModel> }>()
);

export const GetDetailLaporanInvestasiFailedActionReducer = on(
  GetDetailLaporanInvestasiFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailLaporanInvestasiFailedInteractionActionReducer = on(
  GetDetailLaporanInvestasiFailed,
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
