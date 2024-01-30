import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LaporanInvestasi } from '../../models/laporan-investasi.model';

export const GetDetailLaporanInvestasiSucceed = createAction(
  'Services.Auth.Events.GetDetailLaporanInvestasiSucceed',
  props<{ response: DataResponse<LaporanInvestasi> }>()
);

export const GetDetailLaporanInvestasiSucceedActionReducer = on(
  GetDetailLaporanInvestasiSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      laporanInvestasi: {
        ...state?.laporanInvestasi,
        detail: {
          ...state?.laporanInvestasi?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailLaporanInvestasiSucceedInteractionActionReducer = on(
  GetDetailLaporanInvestasiSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      laporanInvestasi: {
        ...state?.laporanInvestasi,
        detail: {
          ...state?.laporanInvestasi?.detail,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
