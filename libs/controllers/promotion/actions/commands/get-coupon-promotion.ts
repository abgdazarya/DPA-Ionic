import { INITIAL_STATE, createAction, on, props } from '@ngrx/store';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';

export const SubmitCouponPromotion = createAction(
  'Services.Menu.Promotion.Commands.SubmitCouponPromotion',
  props<{ payload: any; async?: boolean }>()
);

export const SubmitCouponPromotionReset = createAction(
  'Services.Menu.Promotion.Commands.SubmitCouponPromotionReset',
  props<{ response: any; async?: boolean }>()
);

export const SubmitCouponPromotionInteractionReset = createAction(
  'Services.Menu.Promotion.Commands.SubmitCouponPromotionInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const SubmitCouponPromotionActionReducer = on(
  SubmitCouponPromotion,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const SubmitCouponPromotionActionResetReducer = on(
  SubmitCouponPromotionReset,
  (state: any, { response }) => {
    return {
      ...state,
      promotionCoupon: {
        // ...state?.promotionCoupon,
        ...INITIAL_STATE,
        ...response,
      },
    };
  }
);

export const SubmitCouponPromotionInteractionActionReducer = on(
  SubmitCouponPromotion,
  (state: any, {}) => {
    return {
      ...state,
      promotionCoupon: {
        ...state?.promotionCoupon,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const SubmitCouponPromotionInteractionActionResetReducer = on(
  SubmitCouponPromotionInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      promotionCoupon: {
        ...INITIAL_INTERACTION_STATE,
        ...response,
      },
    };
  }
);
