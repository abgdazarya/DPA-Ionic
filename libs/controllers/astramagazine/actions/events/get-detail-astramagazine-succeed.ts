import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AstramagazineModel } from '../../models/astramagazine.model';

export const GetDetailAstramagazineSucceed = createAction(
  'Services.Menu.Astramagazine.Events.GetDetailAstramagazineSucceed',
  props<{ response: DataResponse<AstramagazineModel> }>()
);

export const GetDetailAstramagazineSucceedActionReducer = on(
  GetDetailAstramagazineSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);

export const GetDetailAstramagazineSucceedInteractionActionReducer = on(
  GetDetailAstramagazineSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
