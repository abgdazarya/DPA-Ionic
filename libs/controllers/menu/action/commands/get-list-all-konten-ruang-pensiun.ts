import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetListAllKontenRuangPensiun = createAction(
  'Services.Menu.Commands.GetListAllKontenRuangPensiun',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListAllKontenRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetListAllKontenRuangPensiunReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListAllKontenRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetListAllKontenRuangPensiunInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListAllKontenRuangPensiunActionReducer = on(
  GetListAllKontenRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetListAllKontenRuangPensiunActionResetReducer = on(
  GetListAllKontenRuangPensiunReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      allKontenRuangPensiun: {
        ...state?.allKontenRuangPensiun,
        [dataType]: {
          ...state?.allKontenRuangPensiun?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetListAllKontenRuangPensiunInteractionActionReducer = on(
  GetListAllKontenRuangPensiun,
  (state: any, { async, dataType }) => {
    return {
      ...state,
      allKontenRuangPensiun: {
        ...state?.allKontenRuangPensiun,
        [dataType]: {
          ...state?.allKontenRuangPensiun?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: !async,
        },
      },
    };
  }
);

export const GetListAllKontenRuangPensiunInteractionActionResetReducer = on(
  GetListAllKontenRuangPensiunInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      allKontenRuangPensiun: {
        ...state?.allKontenRuangPensiun,
        [dataType]: {
          ...state?.allKontenRuangPensiun?.[dataType],
          ...response,
        },
      },
    };
  }
);
