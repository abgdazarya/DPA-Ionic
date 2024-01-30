import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { DeleteProfilModel } from '../../models/delete-profil';

export const DeleteProfilSucceed = createAction(
  'Services.Auth.Events.DeleteProfilSucceed',
  props<{ response: DataResponse<DeleteProfilModel> }>()
);

export const DeleteProfilSucceedActionReducer = on(
  DeleteProfilSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      deleteProfil: {
        ...state?.deleteProfil,
        main: {
          ...state?.deleteProfil?.main,
          ...response,
        },
      },
    };
  }
);

export const DeleteProfilSucceedInteractionActionReducer = on(
  DeleteProfilSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      deleteProfil: {
        ...state?.deleteProfil,
        main: {
          ...state?.deleteProfil?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
