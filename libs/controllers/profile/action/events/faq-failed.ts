import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { FaqData } from '../../models/faq';
import { KartuPesertaData } from '../../models/kartu-peserta';

export const FaqFailed = createAction(
  'Services.Profile.Events.GetFaqFailed',
  props<{ response: DataResponse<FaqData> }>()
);

export const FaqFailedActionReducer = on(FaqFailed, (state: any) => {
  return {
    ...state,
    faq: {},
  };
});

export const FaqFailedInteractionActionReducer = on(FaqFailed, (state: any) => {
  return {
    ...state,
    faq: {
      // ...state?.faq,
      code: null,
      success: null,
      error: null,
      type: InteractionType.FAILED,
      isLoading: false,
    },
  };
});
