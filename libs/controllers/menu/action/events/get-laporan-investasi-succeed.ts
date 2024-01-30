import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { LaporanInvestasi } from '../../models/laporan-investasi.model';

export const GetLaporanInvestasiSucceed = createAction(
  'Services.Auth.Events.GetLaporanInvestasiSucceed',
  props<{ response: DataResponseArray<LaporanInvestasi> }>()
);

export const GetLaporanInvestasiSucceedActionReducer = on(
  GetLaporanInvestasiSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      laporanInvestasi: {
        ...state?.laporanInvestasi,
        list: {
          ...state?.laporanInvestasi?.list,
          ...response,
        },
      },
    };
  }
);

export const GetLaporanInvestasiSucceedInteractionActionReducer = on(
  GetLaporanInvestasiSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      laporanInvestasi: {
        ...state?.laporanInvestasi,
        list: {
          ...state?.laporanInvestasi?.list,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
