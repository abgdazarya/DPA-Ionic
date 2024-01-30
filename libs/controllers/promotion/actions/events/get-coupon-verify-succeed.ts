import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { CouponVerifyModel } from '../../models/coupon-verify.model';

export const GetCouponVerifySucceed = createAction(
  'Services.Menu.Promotion.Events.GetCouponVerifySucceed',
  props<{
    response: DataResponse<CouponVerifyModel>;
  }>()
);

export const GetCouponVerifySucceedActionReducer = on(
  GetCouponVerifySucceed,
  (state: any, { response }) => {
    return {
      ...state,
      couponVerify: {
        ...state?.couponVerify,
        ...response,
      },
    };
  }
);

export const GetCouponVerifyInteractionSucceedActionReducer = on(
  GetCouponVerifySucceed,
  (state: any, { response }) => {
    return {
      ...state,
      couponVerify: {
        ...state?.couponVerify,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
