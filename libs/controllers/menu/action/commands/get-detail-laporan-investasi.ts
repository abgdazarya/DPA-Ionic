import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetDetailLaporanInvestasi = createAction(
  'Services.Menu.Commands.GetDetailLaporanInvestasi',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailLaporanInvestasiReset = createAction(
  'Services.Menu.Commands.GetDetailLaporanInvestasiReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailLaporanInvestasiInteractionReset = createAction(
  'Services.Menu.Commands.GetDetailLaporanInvestasiInteractionReset',
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

export const GetDetailLaporanInvestasiInteractionActionReducer = on(
  GetDetailLaporanInvestasi,
  (state: any, {}) => {
    return {
      ...state,
      laporanInvestasi: {
        ...state?.laporanInvestasi,
        detail: {
          ...state?.laporanInvestasi?.detail,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetDetailLaporanInvestasiInteractionActionResetReducer = on(
  GetDetailLaporanInvestasiInteractionReset,
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
