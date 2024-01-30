import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { DetailProfile } from '../../models/profile';

export const EditProfileSucceed = createAction(
  'Services.Auth.Events.EditProfileSucceed',
  props<{ response: DataResponse<DetailProfile> }>()
);

export const EditProfileSucceedActionReducer = on(
  EditProfileSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      editProfile: {
        ...state?.editProfile,
        main: {
          ...state?.editProfile?.main,
          ...response,
        },
      },
    };
  }
);

export const EditProfileSucceedInteractionActionReducer = on(
  EditProfileSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      editProfile: {
        ...state?.editProfile,
        main: {
          ...state?.editProfile?.main,
          ...response,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
