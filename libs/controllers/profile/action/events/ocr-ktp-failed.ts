import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { OCRTokenDto } from '../../dtos/ocr-token.dto';
import { OCRData } from '../../models/ocr.model';

export const OcrKtpFailed = createAction(
  'Services.Profile.Commands.SetOcrKtpFailed',
  props<{ response: DataResponse<OCRData>; async?: boolean }>()
);

export const OcrKtpFailedActionReducer = on(
  OcrKtpFailed,
  (state: any, { response }) => {
    return {
      ...state,
      ...response,
    };
  }
);

export const OcrKtpFailedInteractionActionReducer = on(
  OcrKtpFailed,
  (state: any, { response }) => {
    return {
      ...state,
      ocrKtp: {
        ...state?.ocrKtp,
        code: response?.code,
        success: null,
        error: response?.message,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
