import { createAction, on, props } from '@ngrx/store';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';
import { OCRTokenDto } from '../../dtos/ocr-token.dto';

export const OcrToken = createAction(
  'Services.Profile.Commands.GenerateOcrToken',
  props<{ payload: OCRTokenDto; async?: boolean }>()
);

export const OcrTokenActionReducer = on(OcrToken, (state: any) => {
  return {
    ...state,
  };
});

export const OcrTokenInteractionActionReducer = on(
  OcrToken,
  (state: any, response) => {
    return {
      ...state,
      ocrToken: {
        ...state?.ocrToken,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);
