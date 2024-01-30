import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { EditKerabatData } from '../../models/edit-kerabat';

export const EditKerabatFailed = createAction(
  'Services.Auth.Events.EditKerabatFailed',
  props<{ response: DataResponse<EditKerabatData> }>()
);

export const EditKerabatFailedActionReducer = on(
  EditKerabatFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const EditKerabatFailedInteractionActionReducer = on(
  EditKerabatFailed,
  (state: any, { response }) => {
    return {
      ...state,
      editKerabat: {
        ...state?.editKerabat,
        main: {
          ...state?.editKerabat?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
