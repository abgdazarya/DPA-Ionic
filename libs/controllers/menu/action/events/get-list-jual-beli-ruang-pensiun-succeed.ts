import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { JualBeliRuangPensiun } from '../../models/jual-beli-ruang-pensiun.model';

export const GetListJualBeliRuangPensiunSucceed = createAction(
  'Services.Menu.Events.GetListJualBeliRuangPensiunSucceed',
  props<{
    response: DataResponsePagination<JualBeliRuangPensiun>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListJualBeliRuangPensiunSucceedActionReducer = on(
  GetListJualBeliRuangPensiunSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        [dataType]: {
          ...state?.jualBeliRuangPensiun?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetListJualBeliRuangPensiunSucceedInteractionActionReducer = on(
  GetListJualBeliRuangPensiunSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        [dataType]: {
          ...state?.jualBeliRuangPensiun?.[dataType],
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
