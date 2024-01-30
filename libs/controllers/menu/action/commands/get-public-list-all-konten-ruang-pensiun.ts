import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetPublicListAllKontenRuangPensiun = createAction(
  'Services.Menu.Commands.GetPublicListAllKontenRuangPensiun',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListAllKontenRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetPublicListAllKontenRuangPensiunReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListAllKontenRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicListAllKontenRuangPensiunInteractionReset',
  props<{
    response: any;

    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';

    async?: boolean;
  }>()
);

export const GetPublicListAllKontenRuangPensiunActionReducer = on(
  GetPublicListAllKontenRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListAllKontenRuangPensiunActionResetReducer = on(
  GetPublicListAllKontenRuangPensiunReset,
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

export const GetPublicListAllKontenRuangPensiunInteractionActionReducer = on(
  GetPublicListAllKontenRuangPensiun,
  (state: any, { dataType }) => {
    return {
      ...state,
      allKontenRuangPensiun: {
        ...state?.allKontenRuangPensiun,
        [dataType]: {
          ...state?.allKontenRuangPensiun?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetPublicListAllKontenRuangPensiunInteractionActionResetReducer =
  on(
    GetPublicListAllKontenRuangPensiunInteractionReset,
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
