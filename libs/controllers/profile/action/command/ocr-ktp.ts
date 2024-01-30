import { createAction, on, props } from '@ngrx/store';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';
import { OCRDto } from '../../dtos/ocr.dto';

export const OcrKtp = createAction(
  'Services.Profile.Commands.SetOcrKtp',
  props<{ payload: OCRDto; async?: boolean }>()
);

export const OcrKtpInteractionReset = createAction(
  'Services.Profile.Commands.GenerateOcrTokenReset',
  props<{ async?: boolean }>()
);

export const OcrKtpActionReducer = on(OcrKtp, (state: any) => {
  return {
    ...state,
  };
});

export const OcrKtpInteractionResetActionReducer = on(
  OcrKtpInteractionReset,
  (state: any) => {
    return {
      ...state,
      ocrKtp: {
        ...INITIAL_INTERACTION_STATE,
      },
    };
  }
);

export const OcrKtpInteractionActionReducer = on(OcrKtp, (state: any) => {
  return {
    ...state,
    ocrKtp: {
      ...state?.ocrKtp,
      type: InteractionType.PROCESS,
      isLoading: true,
    },
  };
});
