import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetLaporanInvestasi = createAction(
  'Services.Menu.Commands.GetLaporanInvestasi',
  props<{ payload: any; async?: boolean }>()
);

export const GetLaporanInvestasiReset = createAction(
  'Services.Menu.Commands.GetLaporanInvestasiReset',
  props<{ response: any; async?: boolean }>()
);

export const GetLaporanInvestasiInteractionReset = createAction(
  'Services.Menu.Commands.GetLaporanInvestasiInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetLaporanInvestasiActionReducer = on(
  GetLaporanInvestasi,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetLaporanInvestasiActionResetReducer = on(
  GetLaporanInvestasiReset,
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

export const GetLaporanInvestasiInteractionActionReducer = on(
  GetLaporanInvestasi,
  (state: any, {}) => {
    return {
      ...state,
      laporanInvestasi: {
        ...state?.laporanInvestasi,
        list: {
          ...state?.laporanInvestasi?.list,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetLaporanInvestasiInteractionActionResetReducer = on(
  GetLaporanInvestasiInteractionReset,
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
