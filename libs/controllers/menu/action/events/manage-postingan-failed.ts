import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { PostinganRuangPensiun } from '../../models/postingan-ruang-pensiun.model';

export const ManagePostinganFailed = createAction(
  'Services.Menu.Events.ManagePostinganFailed',
  props<{
    response: DataResponse<PostinganRuangPensiun>;
  }>()
);

export const ManagePostinganFailedActionReducer = on(
  ManagePostinganFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const ManagePostinganFailedInteractionActionReducer = on(
  ManagePostinganFailed,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        manage: {
          ...state?.postinganRuangPensiun?.manage,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
