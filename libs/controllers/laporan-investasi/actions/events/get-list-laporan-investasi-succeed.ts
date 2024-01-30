import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { LaporanInvestasiModel } from '../../models/laporan-investasi.model';

export const GetListLaporanInvestasiSucceed = createAction(
  'Services.Menu.LaporanInvestasi.Events.GetListLaporanInvestasiSucceed',
  props<{
    response: DataResponseArray<LaporanInvestasiModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
  }>()
);

export const GetListLaporanInvestasiSucceedActionReducer = on(
  GetListLaporanInvestasiSucceed,
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

export const GetListLaporanInvestasiSucceedInteractionActionReducer = on(
  GetListLaporanInvestasiSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
