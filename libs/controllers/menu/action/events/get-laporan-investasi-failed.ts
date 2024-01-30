import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { LaporanInvestasi } from '../../models/laporan-investasi.model';

export const GetLaporanInvestasiFailed = createAction(
  'Services.Auth.Events.GetLaporanInvestasiFailed',
  props<{ response: DataResponseArray<LaporanInvestasi> }>()
);

export const GetLaporanInvestasiFailedActionReducer = on(
  GetLaporanInvestasiFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetLaporanInvestasiFailedInteractionActionReducer = on(
  GetLaporanInvestasiFailed,
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
