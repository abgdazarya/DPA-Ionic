import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetPublicListKategoriRuangPensiun = createAction(
  'Services.Menu.Commands.GetPublicListKategoriRuangPensiun',
  props<{
    payload: any;
    async?: boolean;
  }>()
);

export const GetPublicListKategoriRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetPublicListKategoriRuangPensiunReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetPublicListKategoriRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicListKategoriRuangPensiunInteractionReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetPublicListKategoriRuangPensiunActionReducer = on(
  GetPublicListKategoriRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListKategoriRuangPensiunActionResetReducer = on(
  GetPublicListKategoriRuangPensiunReset,
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

export const GetPublicListKategoriRuangPensiunInteractionActionReducer = on(
  GetPublicListKategoriRuangPensiun,
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

export const GetPublicListKategoriRuangPensiunInteractionActionResetReducer =
  on(
    GetPublicListKategoriRuangPensiunInteractionReset,
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
