import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { UploadPhotoData } from '../../models/upload-photo';

export const UploadPhotoFailed = createAction(
  'Services.Auth.Events.UploadPhotoFailed',
  props<{ response: DataResponse<UploadPhotoData> }>()
);

export const UploadPhotoFailedActionReducer = on(
  UploadPhotoFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const UploadPhotoFailedInteractionActionReducer = on(
  UploadPhotoFailed,
  (state: any, { response }) => {
    return {
      ...state,
      photo: {
        ...state?.photo,
        main: {
          ...state?.photo?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
