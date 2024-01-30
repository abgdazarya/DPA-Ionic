import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { LaporanInvestasiModel } from '../../models/laporan-investasi.model';

export const GetListLaporanInvestasiFailed = createAction(
  'Services.Menu.LaporanInvestasi.Events.GetListLaporanInvestasiFailed',
  props<{
    response: DataResponseArray<LaporanInvestasiModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
  }>()
);

export const GetListLaporanInvestasiFailedActionReducer = on(
  GetListLaporanInvestasiFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,

      [dataType]: {
        ...state?.[dataType],
        ...response,
      },
    };
  }
);

export const GetListLaporanInvestasiFailedInteractionActionReducer = on(
  GetListLaporanInvestasiFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
