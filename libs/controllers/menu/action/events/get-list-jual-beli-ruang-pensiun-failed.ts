import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { JualBeliRuangPensiun } from '../../models/jual-beli-ruang-pensiun.model';

export const GetListJualBeliRuangPensiunFailed = createAction(
  'Services.Menu.Events.GetListJualBeliRuangPensiunFailed',
  props<{
    response: DataResponsePagination<JualBeliRuangPensiun>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListJualBeliRuangPensiunFailedActionReducer = on(
  GetListJualBeliRuangPensiunFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetListJualBeliRuangPensiunFailedInteractionActionReducer = on(
  GetListJualBeliRuangPensiunFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        [dataType]: {
          ...state?.jualBeliRuangPensiun?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
