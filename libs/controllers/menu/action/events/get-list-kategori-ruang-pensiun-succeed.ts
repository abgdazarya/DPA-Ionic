import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { KategoriRuangPensiun } from '../../models/kategori-ruang-pensiun.model';

export const GetListKategoriRuangPensiunSucceed = createAction(
  'Services.Menu.Events.GetListKategoriRuangPensiunSucceed',
  props<{
    response: DataResponsePagination<KategoriRuangPensiun>;
  }>()
);

export const GetListKategoriRuangPensiunSucceedActionReducer = on(
  GetListKategoriRuangPensiunSucceed,
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

export const GetListKategoriRuangPensiunSucceedInteractionActionReducer = on(
  GetListKategoriRuangPensiunSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      kategoriRuangPensiun: {
        ...state?.kategoriRuangPensiun,
        list: {
          ...state?.kategoriRuangPensiun?.list,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
