import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { OCRTokenData } from '../../models/ocr-token.model';

export const OcrTokenSucceed = createAction(
  'Services.Profile.Commands.GenerateOcrTokenSucceed',
  props<{ response: DataResponse<OCRTokenData>; async?: boolean }>()
);

export const OcrTokenSucceedActionReducer = on(
  OcrTokenSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      ocrToken: {
        ...state?.ocrToken,
        ...response?.data,
      },
    };
  }
);

export const OcrTokenSucceedInteractionActionReducer = on(
  OcrTokenSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      ocrToken: {
        ...state?.ocrToken,
        code: response?.code,
        success: response?.message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
