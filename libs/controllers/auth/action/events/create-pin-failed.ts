import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { CreatePinData } from '../../models/create-pin-data';

export const CreatePinFailed = createAction(
  'Services.Auth.Events.CreatePinFailed',
  props<{ response: DataResponse<CreatePinData> }>()
);

export const CreatePinFailedActionReducer = on(
  CreatePinFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const CreatePinFailedInteractionActionReducer = on(
  CreatePinFailed,
  (state: any, { response }) => {
    return {
      ...state,
      createPin: {
        ...state?.createPin,
        main: {
          ...state?.createPin?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
