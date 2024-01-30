import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { FaqData } from '../../models/faq';
import { FaqCategoryData } from '../../models/faq-category';

export const FaqCategorySucceed = createAction(
  'Services.Profile.Events.GetFaqCategorySucceed',
  props<{ response: DataResponse<FaqCategoryData[]> }>()
);

export const FaqCategorySucceedActionReducer = on(
  FaqCategorySucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      faqCategory: {
        ...state?.faqCategory,
        data,
      },
    };
  }
);

export const FaqCategorySucceedInteractionActionReducer = on(
  FaqCategorySucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      faqCategory: {
        ...state?.faqCategory,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
