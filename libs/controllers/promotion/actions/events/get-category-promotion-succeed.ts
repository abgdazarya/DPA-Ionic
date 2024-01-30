import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { CategoryPromotionModel } from '../../models/category-promotion.model';

export const GetCategoryPromotionSucceed = createAction(
  'Services.Menu.Promotion.Events.GetCategoryPromotionSucceed',
  props<{
    response: DataResponseArray<CategoryPromotionModel>;
  }>()
);

export const GetCategoryPromotionSucceedActionReducer = on(
  GetCategoryPromotionSucceed,
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

export const GetCategoryPromotionSucceedInteractionActionReducer = on(
  GetCategoryPromotionSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      categoryPromo: {
        ...state?.categoryPromo,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
