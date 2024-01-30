import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { PostinganRuangPensiun } from '../../models/postingan-ruang-pensiun.model';

export const GetDetailPostinganRuangPensiunSucceed = createAction(
  'Services.Menu.Events.GetDetailPostinganRuangPensiunSucceed',
  props<{ response: DataResponse<PostinganRuangPensiun> }>()
);

export const GetDetailPostinganRuangPensiunSucceedActionReducer = on(
  GetDetailPostinganRuangPensiunSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        detail: {
          ...state?.postinganRuangPensiun?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailPostinganRuangPensiunSucceedInteractionActionReducer = on(
  GetDetailPostinganRuangPensiunSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        detail: {
          ...state?.postinganRuangPensiun?.detail,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
