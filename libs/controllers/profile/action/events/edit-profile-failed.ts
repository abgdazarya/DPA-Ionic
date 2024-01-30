import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { DetailProfile } from '../../models/profile';

export const EditProfileFailed = createAction(
  'Services.Auth.Events.EditProfileFailed',
  props<{ response: DataResponse<DetailProfile> }>()
);

export const EditProfileFailedActionReducer = on(
  EditProfileFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const EditProfileFailedInteractionActionReducer = on(
  EditProfileFailed,
  (state: any, { response }) => {
    return {
      ...state,
      editProfile: {
        ...state?.editProfile,
        main: {
          ...state?.editProfile?.main,
          ...response,
          error: response?.message || 'Error Server',
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
