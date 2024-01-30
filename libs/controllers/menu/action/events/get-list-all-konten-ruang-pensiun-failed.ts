import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { AllKontenRuangPensiun } from '../../models/all-konten-ruang-pensiun.model';

export const GetListAllKontenRuangPensiunFailed = createAction(
  'Services.Menu.Events.GetListAllKontenRuangPensiunFailed',
  props<{
    response: DataResponsePagination<AllKontenRuangPensiun>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListAllKontenRuangPensiunFailedActionReducer = on(
  GetListAllKontenRuangPensiunFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetListAllKontenRuangPensiunFailedInteractionActionReducer = on(
  GetListAllKontenRuangPensiunFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      allKontenRuangPensiun: {
        ...state?.allKontenRuangPensiun,
        [dataType]: {
          ...state?.allKontenRuangPensiun?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
