import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { OCRTokenDto } from '../../dtos/ocr-token.dto';
import { OCRTokenData } from '../../models/ocr-token.model';

export const OcrTokenFailed = createAction(
  'Services.Profile.Commands.GenerateOcrTokenFailed',
  props<{ response: DataResponse<OCRTokenData>; async?: boolean }>()
);

export const OcrTokenFailedActionReducer = on(OcrTokenFailed, (state: any) => {
  return {
    ...state,
  };
});

export const OcrTokenFailedInteractionActionReducer = on(
  OcrTokenFailed,
  (state: any, { response }) => {
    return {
      ...state,
      ocrToken: {
        ...state?.ocrToken,
        code: response?.code,
        success: null,
        error: response?.message,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
