import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetListLaporanInvestasi = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetListLaporanInvestasi',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListLaporanInvestasiReset = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetListLaporanInvestasiReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListLaporanInvestasiInteractionReset = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetListLaporanInvestasiInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListLaporanInvestasiActionReducer = on(
  GetListLaporanInvestasi,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetListLaporanInvestasiActionResetReducer = on(
  GetListLaporanInvestasiReset,
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

export const GetListLaporanInvestasiInteractionActionReducer = on(
  GetListLaporanInvestasi,
  (state: any, { dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetListLaporanInvestasiInteractionActionResetReducer = on(
  GetListLaporanInvestasiInteractionReset,
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
