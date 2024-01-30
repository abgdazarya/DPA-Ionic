import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { PostinganRuangPensiun } from '../../models/postingan-ruang-pensiun.model';

export const GetListPostinganRuangPensiunFailed = createAction(
  'Services.Menu.Events.GetListPostinganRuangPensiunFailed',
  props<{
    response: DataResponsePagination<PostinganRuangPensiun>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListPostinganRuangPensiunFailedActionReducer = on(
  GetListPostinganRuangPensiunFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetListPostinganRuangPensiunFailedInteractionActionReducer = on(
  GetListPostinganRuangPensiunFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        [dataType]: {
          ...state?.postinganRuangPensiun?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
