import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { UploadPhotoData } from '../../models/upload-photo';

export const UploadPhotoSucceed = createAction(
  'Services.Auth.Events.UploadPhotoSucceed',
  props<{ response: DataResponse<UploadPhotoData> }>()
);

export const UploadPhotoSucceedActionReducer = on(
  UploadPhotoSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      photo: {
        ...state?.photo,
        main: {
          ...state?.photo?.main,
          ...response,
        },
      },
    };
  }
);

export const UploadPhotoSucceedInteractionActionReducer = on(
  UploadPhotoSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      photo: {
        ...state?.photo,
        main: {
          ...state?.photo?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
