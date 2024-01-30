import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailLaporanInvestasi = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetDetailLaporanInvestasi',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailLaporanInvestasiReset = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetDetailLaporanInvestasiReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailLaporanInvestasiInteractionReset = createAction(
  'Services.Menu.LaporanInvestasi.Commands.GetDetailLaporanInvestasiInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailLaporanInvestasiActionReducer = on(
  GetDetailLaporanInvestasi,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailLaporanInvestasiActionResetReducer = on(
  GetDetailLaporanInvestasiReset,
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

export const GetDetailLaporanInvestasiInteractionActionReducer = on(
  GetDetailLaporanInvestasi,
  (state: any, {}) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetDetailLaporanInvestasiInteractionActionResetReducer = on(
  GetDetailLaporanInvestasiInteractionReset,
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
