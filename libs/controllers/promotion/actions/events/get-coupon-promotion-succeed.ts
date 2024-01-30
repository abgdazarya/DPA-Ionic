import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { CouponPromotionModel } from '../../models/coupon-promotion.model';

export const SubmitCouponPromotionSucceed = createAction(
  'Services.Menu.Promotion.Events.SubmitCouponPromotionSucceed',
  props<{ response: DataResponse<CouponPromotionModel> }>()
);

export const SubmitCouponPromotionSucceedActionReducer = on(
  SubmitCouponPromotionSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      promotionCoupon: {
        ...state?.promotionCoupon,
        ...response,
      },
    };
  }
);

export const SubmitCouponPromotionSucceedInteractionActionReducer = on(
  SubmitCouponPromotionSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      promotionCoupon: {
        ...state?.promotionCoupon,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
