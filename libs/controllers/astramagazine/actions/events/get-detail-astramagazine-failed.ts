import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AstramagazineModel } from '../../models/astramagazine.model';

export const GetDetailAstramagazineFailed = createAction(
  'Services.Menu.Astramagazine.Events.GetDetailAstramagazineFailed',
  props<{ response: DataResponse<AstramagazineModel> }>()
);

export const GetDetailAstramagazineFailedActionReducer = on(
  GetDetailAstramagazineFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailAstramagazineFailedInteractionActionReducer = on(
  GetDetailAstramagazineFailed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
