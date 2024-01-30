import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { CouponVerifyModel } from '../../models/coupon-verify.model';

export const GetCouponVerifyFailed = createAction(
  'Services.Menu.Promotion.Events.GetCouponVerifyFailed',
  props<{
    response: DataResponse<CouponVerifyModel>;
  }>()
);

export const GetCouponVerifyFailedActionReducer = on(
  GetCouponVerifyFailed,
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

export const GetCouponVerifyInteractionFailedActionReducer = on(
  GetCouponVerifyFailed,
  (state: any, { response }) => {
    return {
      ...state,
      couponVerify: {
        ...state?.couponVerify,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
