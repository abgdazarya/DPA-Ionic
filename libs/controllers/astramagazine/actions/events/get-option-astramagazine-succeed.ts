import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AstramagazineOptionModel } from '../../models/astramagazine-option.model';

export const GetOptionAstramagazineSucceed = createAction(
  'Services.Menu.Astramagazine.Events.GetOptionAstramagazineSucceed',
  props<{ response: DataResponse<AstramagazineOptionModel> }>()
);

export const GetOptionAstramagazineSucceedActionReducer = on(
  GetOptionAstramagazineSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      option: {
        ...state?.option,
        ...response,
      },
    };
  }
);

export const GetOptionAstramagazineSucceedInteractionActionReducer = on(
  GetOptionAstramagazineSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      option: {
        ...state?.option,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
