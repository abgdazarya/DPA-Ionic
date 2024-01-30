import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { KategoriRuangPensiun } from '../../models/kategori-ruang-pensiun.model';

export const GetListKategoriRuangPensiunFailed = createAction(
  'Services.Menu.Events.GetListKategoriRuangPensiunFailed',
  props<{
    response: DataResponsePagination<KategoriRuangPensiun>;
  }>()
);

export const GetListKategoriRuangPensiunFailedActionReducer = on(
  GetListKategoriRuangPensiunFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetListKategoriRuangPensiunFailedInteractionActionReducer = on(
  GetListKategoriRuangPensiunFailed,
  (state: any, { response }) => {
    return {
      ...state,
      kategoriRuangPensiun: {
        ...state?.kategoriRuangPensiun,
        list: {
          ...state?.kategoriRuangPensiun?.list,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
