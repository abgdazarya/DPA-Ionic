import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetCategoryPromotion = createAction(
  'Services.Menu.Promotion.Commands.GetCategoryPromotion',
  props<{
    payload: any;
    async?: boolean;
  }>()
);

export const GetCategoryPromotionReset = createAction(
  'Services.Menu.Promotion.Commands.GetCategoryPromotionReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetCategoryPromotionInteractionReset = createAction(
  'Services.Menu.Promotion.Commands.GetCategoryPromotionInteractionReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetCategoryPromotionActionReducer = on(
  GetCategoryPromotion,
  (state: any, { payload }) => {
    return {
      ...state,
    };
  }
);

export const GetCategoryPromotionActionResetReducer = on(
  GetCategoryPromotionReset,
  (state: any, { response }) => {
    return {
      ...state,
      categoryPromo: {
        // ...state?.categoryPromo,
        ...response,
      },
    };
  }
);

export const GetCategoryPromotionInteractionActionReducer = on(
  GetCategoryPromotion,
  (state: any, {}) => {
    return {
      ...state,
      categoryPromo: {
        ...state?.categoryPromo,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetCategoryPromotionInteractionActionResetReducer = on(
  GetCategoryPromotionInteractionReset,
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
