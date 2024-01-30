import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { LaporanInvestasi } from '../../models/laporan-investasi.model';

export const GetDetailLaporanInvestasiFailed = createAction(
  'Services.Auth.Events.GetLaporanInvestasiFailed',
  props<{ response: DataResponseArray<LaporanInvestasi> }>()
);

export const GetDetailLaporanInvestasiFailedActionReducer = on(
  GetDetailLaporanInvestasiFailed,
  (state: any) => {
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
      laporanInvestasi: {
        ...state?.laporanInvestasi,
        list: {
          ...state?.laporanInvestasi?.list,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
