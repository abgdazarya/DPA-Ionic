import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AstramagazineModel } from '../../models/astramagazine.model';

export const GetOptionAstramagazineFailed = createAction(
  'Services.Menu.Astramagazine.Events.GetOptionAstramagazineFailed',
  props<{ response: DataResponse<AstramagazineModel> }>()
);

export const GetOptionAstramagazineFailedActionReducer = on(
  GetOptionAstramagazineFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetOptionAstramagazineFailedInteractionActionReducer = on(
  GetOptionAstramagazineFailed,
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
