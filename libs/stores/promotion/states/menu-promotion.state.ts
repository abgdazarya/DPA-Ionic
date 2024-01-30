import { PromotionModel } from '@controllers/menu-promotion';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponseArray,
  DataResponsePagination,
} from '@shared';
import { CategoryPromotionModel } from 'libs/controllers/promotion/models/category-promotion.model';
import { CouponPromotionModel } from 'libs/controllers/promotion/models/coupon-promotion.model';
import { CouponVerifyModel } from 'libs/controllers/promotion/models/coupon-verify.model';

export interface MenuPromotionState {
  landing: DataResponsePagination<PromotionModel> | undefined | null;
  footer: DataResponsePagination<PromotionModel> | undefined | null;
  list: DataResponsePagination<PromotionModel> | undefined | null;
  detail: DataResponse<PromotionModel> | undefined | null;
  latest: DataResponsePagination<PromotionModel> | undefined | null;
  categoryPromo: DataResponseArray<CategoryPromotionModel> | undefined | null;
  couponVerify: DataResponse<CouponVerifyModel> | undefined | null;
  promotionCoupon: DataResponse<CouponPromotionModel> | undefined | null;
}

export const MENU_PROMOTION_INITIAL_STATE: MenuPromotionState = {
  landing: DATA_RESPONSE_INITIAL_STATE,
  footer: DATA_RESPONSE_INITIAL_STATE,
  list: DATA_RESPONSE_INITIAL_STATE,
  detail: DATA_RESPONSE_INITIAL_STATE,
  latest: DATA_RESPONSE_INITIAL_STATE,
  categoryPromo: DATA_RESPONSE_INITIAL_STATE,
  couponVerify: DATA_RESPONSE_INITIAL_STATE,
  promotionCoupon: DATA_RESPONSE_INITIAL_STATE,
};
