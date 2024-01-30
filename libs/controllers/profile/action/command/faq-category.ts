import { createAction, on, props } from '@ngrx/store';
import { UserInfoDto } from '../../dtos/user-info.dto';
import { InteractionType } from '@shared';
import { FaqDto } from '../../dtos/faq.dto';

export const FaqCategory = createAction(
  'Services.Profile.Commands.GetFaqCategory',
  props<{ params?: any; async?: boolean }>()
);

export const FaqCategoryActionReducer = on(FaqCategory, (state: any) => {
  return {
    ...state,
  };
});

export const FaqCategoryInteractionActionReducer = on(
  FaqCategory,
  (state: any) => {
    return {
      ...state,
      faqCategory: {
        ...state?.faqCategory,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);
