import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { CouponPromotionModel } from '../../models/coupon-promotion.model';

export const SubmitCouponPromotionFailed = createAction(
  'Services.Menu.Promotion.Events.SubmitCouponPromotionFailed',
  props<{ response: DataResponse<CouponPromotionModel> }>()
);

export const SubmitCouponPromotionFailedActionReducer = on(
  SubmitCouponPromotionFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const SubmitCouponPromotionFailedInteractionActionReducer = on(
  SubmitCouponPromotionFailed,
  (state: any, { response }) => {
    return {
      ...state,
      promotionCoupon: {
        ...state?.promotionCoupon,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
