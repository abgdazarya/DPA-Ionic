import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { AllKontenRuangPensiun } from '../../models/all-konten-ruang-pensiun.model';

export const GetListAllKontenRuangPensiunSucceed = createAction(
  'Services.Menu.Events.GetListAllKontenRuangPensiunSucceed',
  props<{
    response: DataResponsePagination<AllKontenRuangPensiun>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListAllKontenRuangPensiunSucceedActionReducer = on(
  GetListAllKontenRuangPensiunSucceed,
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

export const GetListAllKontenRuangPensiunSucceedInteractionActionReducer = on(
  GetListAllKontenRuangPensiunSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      allKontenRuangPensiun: {
        ...state?.allKontenRuangPensiun,
        [dataType]: {
          ...state?.allKontenRuangPensiun?.[dataType],
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
