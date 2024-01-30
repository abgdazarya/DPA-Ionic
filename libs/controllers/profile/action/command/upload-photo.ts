import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { UploadPhotoDto } from '../../dtos/upload-photo.dto';

export const UploadPhoto = createAction(
  'Services.Auth.Commands.UploadPhoto',
  props<{ payload: UploadPhotoDto; async?: boolean }>()
);

export const UploadPhotoReset = createAction(
  'Services.Auth.Commands.UploadPhotoReset',
  props<{ response: any; async?: boolean }>()
);

export const UploadPhotoInteractionReset = createAction(
  'Services.Auth.Commands.UploadPhotoInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const UploadPhotoActionReducer = on(UploadPhoto, (state: any) => {
  return {
    ...state,
  };
});

export const UploadPhotoActionResetReducer = on(
  UploadPhotoReset,
  (state: any, { response }) => {
    return {
      ...state,
      photo: {
        ...state?.photo,
        main: {
          ...state?.photo?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const UploadPhotoInteractionActionReducer = on(
  UploadPhoto,
  (state: any) => {
    return {
      ...state,
      photo: {
        ...state?.photo,
        main: {
          ...state?.photo?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const UploadPhotoInteractionActionResetReducer = on(
  UploadPhotoInteractionReset,
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
