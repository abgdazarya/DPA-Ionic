import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { PostinganRuangPensiun } from '../../models/postingan-ruang-pensiun.model';

export const GetListPostinganRuangPensiunSucceed = createAction(
  'Services.Menu.Events.GetListPostinganRuangPensiunSucceed',
  props<{
    response: DataResponsePagination<PostinganRuangPensiun>;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListPostinganRuangPensiunSucceedActionReducer = on(
  GetListPostinganRuangPensiunSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        [dataType]: {
          ...state?.postinganRuangPensiun?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetListPostinganRuangPensiunSucceedInteractionActionReducer = on(
  GetListPostinganRuangPensiunSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        [dataType]: {
          ...state?.postinganRuangPensiun?.[dataType],
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
