import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { AllKontenRuangPensiun } from '../../models/all-konten-ruang-pensiun.model';

export const GetPublicListAllKontenRuangPensiunFailed = createAction(
  'Services.Menu.Events.GetPublicListAllKontenRuangPensiunFailed',
  props<{
    response: DataResponsePagination<AllKontenRuangPensiun>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListAllKontenRuangPensiunFailedActionReducer = on(
  GetPublicListAllKontenRuangPensiunFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListAllKontenRuangPensiunFailedInteractionActionReducer =
  on(
    GetPublicListAllKontenRuangPensiunFailed,
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
