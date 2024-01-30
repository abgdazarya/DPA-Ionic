import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { FaqData } from '../../models/faq';
import { KartuPesertaData } from '../../models/kartu-peserta';
import { FaqCategoryData } from '../../models/faq-category';

export const FaqCategoryFailed = createAction(
  'Services.Profile.Events.GetFaqCategoryFailed',
  props<{ response: DataResponse<FaqCategoryData[]> }>()
);

export const FaqCategoryFailedActionReducer = on(
  FaqCategoryFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const FaqCategoryFailedInteractionActionReducer = on(
  FaqCategoryFailed,
  (state: any) => {
    return {
      ...state,
      faqCategory: {
        ...state?.faqCategory,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
