import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicListLaporanInvestasi = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetPublicListLaporanInvestasi',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListLaporanInvestasiReset = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetPublicListLaporanInvestasiReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListLaporanInvestasiInteractionReset = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetPublicListLaporanInvestasiInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListLaporanInvestasiActionReducer = on(
  GetPublicListLaporanInvestasi,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListLaporanInvestasiActionResetReducer = on(
  GetPublicListLaporanInvestasiReset,
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

export const GetPublicListLaporanInvestasiInteractionActionReducer = on(
  GetPublicListLaporanInvestasi,
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

export const GetPublicListLaporanInvestasiInteractionActionResetReducer = on(
  GetPublicListLaporanInvestasiInteractionReset,
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
