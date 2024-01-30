import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { CategoryPromotionModel } from '../../models/category-promotion.model';

export const GetCategoryPromotionFailed = createAction(
  'Services.Menu.Promotion.Events.GetCategoryPromotionFailed',
  props<{
    response: DataResponseArray<CategoryPromotionModel>;
  }>()
);

export const GetCategoryPromotionFailedActionReducer = on(
  GetCategoryPromotionFailed,
  (state: any, { response }) => {
    return {
      ...state,
      categoryPromo: {
        ...state?.categoryPromo,
        ...response,
      },
    };
  }
);

export const GetCategoryPromotionFailedInteractionActionReducer = on(
  GetCategoryPromotionFailed,
  (state: any, { response }) => {
    return {
      ...state,
      categoryPromo: {
        ...state?.categoryPromo,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
