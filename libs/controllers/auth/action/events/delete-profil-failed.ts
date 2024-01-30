import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { DeleteProfilModel } from '../../models/delete-profil';

export const DeleteProfilFailed = createAction(
  'Services.Auth.Events.DeleteProfilFailed',
  props<{ response: DataResponse<DeleteProfilModel> }>()
);

export const DeleteProfilFailedActionReducer = on(
  DeleteProfilFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const DeleteProfilFailedInteractionActionReducer = on(
  DeleteProfilFailed,
  (state: any, { response }) => {
    return {
      ...state,
      deleteProfil: {
        ...state?.deleteProfil,
        main: {
          ...state?.deleteProfil?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
