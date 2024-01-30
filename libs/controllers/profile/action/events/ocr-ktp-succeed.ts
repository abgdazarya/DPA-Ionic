import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { OCRTokenDto } from '../../dtos/ocr-token.dto';
import { OCRData } from '../../models/ocr.model';

export const OcrKtpSucceed = createAction(
  'Services.Profile.Commands.SetOcrKtpSecceed',
  props<{ response: DataResponse<OCRData>; async?: boolean }>()
);

export const OcrKtpSucceedActionReducer = on(
  OcrKtpSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      ocrKtp: {
        ...state?.ocrKtp,
        ...response,
      },
    };
  }
);

export const OcrKtpSucceedInteractionActionReducer = on(
  OcrKtpSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      ocrKtp: {
        ...state?.ocrKtp,
        code: response?.code,
        success: response?.message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
