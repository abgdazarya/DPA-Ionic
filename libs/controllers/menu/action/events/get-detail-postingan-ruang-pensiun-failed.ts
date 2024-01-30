import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { PostinganRuangPensiun } from '../../models/postingan-ruang-pensiun.model';

export const GetDetailPostinganRuangPensiunFailed = createAction(
  'Services.Menu.Events.GetDetailPostinganRuangPensiunFailed',
  props<{ response: DataResponse<PostinganRuangPensiun> }>()
);

export const GetDetailPostinganRuangPensiunFailedActionReducer = on(
  GetDetailPostinganRuangPensiunFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailPostinganRuangPensiunFailedInteractionActionReducer = on(
  GetDetailPostinganRuangPensiunFailed,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        detail: {
          ...state?.postinganRuangPensiun?.detail,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
