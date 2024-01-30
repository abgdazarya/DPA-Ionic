import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { EditKerabatData } from '../../models/edit-kerabat';

export const EditKerabatSucceed = createAction(
  'Services.Auth.Events.EditKerabatSucceed',
  props<{ response: DataResponse<EditKerabatData> }>()
);

export const EditKerabatSucceedActionReducer = on(
  EditKerabatSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      editKerabat: {
        ...state?.editKerabat,
        main: {
          ...state?.editKerabat?.main,
          ...response,
        },
      },
    };
  }
);

export const EditKerabatSucceedInteractionActionReducer = on(
  EditKerabatSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      editKerabat: {
        ...state?.editKerabat,
        main: {
          ...state?.editKerabat?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
