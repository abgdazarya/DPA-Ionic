import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LaporanInvestasiModel } from '../../models/laporan-investasi.model';

export const GetDetailLaporanInvestasiSucceed = createAction(
  'Services.Menu.LaporanInvestasi.Events.GetDetailLaporanInvestasiSucceed',
  props<{ response: DataResponse<LaporanInvestasiModel> }>()
);

export const GetDetailLaporanInvestasiSucceedActionReducer = on(
  GetDetailLaporanInvestasiSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);

export const GetDetailLaporanInvestasiSucceedInteractionActionReducer = on(
  GetDetailLaporanInvestasiSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
