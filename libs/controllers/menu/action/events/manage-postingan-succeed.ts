import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { PostinganRuangPensiun } from '../../models/postingan-ruang-pensiun.model';

export const ManagePostinganSucceed = createAction(
  'Services.Menu.Events.ManagePostinganSucceed',
  props<{
    response: DataResponse<PostinganRuangPensiun>;
  }>()
);

export const ManagePostinganSucceedActionReducer = on(
  ManagePostinganSucceed,
  (state: any, { response }) => {
    return {
      ...state,
    };
  }
);

export const ManagePostinganSucceedInteractionActionReducer = on(
  ManagePostinganSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        manage: {
          ...state?.postinganRuangPensiun?.manage,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
