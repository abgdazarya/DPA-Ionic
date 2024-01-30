import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetListKategoriRuangPensiun = createAction(
  'Services.Menu.Commands.GetListKategoriRuangPensiun',
  props<{
    payload: any;
    async?: boolean;
  }>()
);

export const GetListKategoriRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetListKategoriRuangPensiunReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetListKategoriRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetListKategoriRuangPensiunInteractionReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetListKategoriRuangPensiunActionReducer = on(
  GetListKategoriRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetListKategoriRuangPensiunActionResetReducer = on(
  GetListKategoriRuangPensiunReset,
  (state: any, { response }) => {
    return {
      ...state,
      kategoriRuangPensiun: {
        ...state?.kategoriRuangPensiun,
        list: {
          ...state?.kategoriRuangPensiun?.list,
          ...response,
        },
      },
    };
  }
);

export const GetListKategoriRuangPensiunInteractionActionReducer = on(
  GetListKategoriRuangPensiun,
  (state: any) => {
    return {
      ...state,
      kategoriRuangPensiun: {
        ...state?.kategoriRuangPensiun,
        list: {
          ...state?.kategoriRuangPensiun?.list,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetListKategoriRuangPensiunInteractionActionResetReducer = on(
  GetListKategoriRuangPensiunInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      kategoriRuangPensiun: {
        ...state?.kategoriRuangPensiun,
        list: {
          ...state?.kategoriRuangPensiun?.list,
          ...response,
        },
      },
    };
  }
);
