import { createAction, on, props } from '@ngrx/store';
import { CreatePinData } from '../../models/create-pin-data';
import { DataResponse, InteractionType } from '@shared';

export const CreatePinSucceed = createAction(
  'Services.Auth.Events.CreatePinSucceed',
  props<{ response: DataResponse<CreatePinData> }>()
);

export const CreatePinSucceedActionReducer = on(
  CreatePinSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      createPin: {
        ...state?.createPin,
        main: {
          ...state?.createPin?.main,
          ...response,
        },
      },
    };
  }
);

export const CreatePinSucceedInteractionActionReducer = on(
  CreatePinSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      createPin: {
        ...state?.createPin,
        main: {
          ...state?.createPin?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
