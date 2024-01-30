import {
  GetPublicListPromotionActionReducer,
  GetPublicListPromotionActionResetReducer,
} from './commands/get-public-list-promotion';

import {
  GetListPromotionActionReducer,
  GetListPromotionActionResetReducer,
} from './commands/get-list-promotion';

import { GetListPromotionSucceedActionReducer } from './events/get-list-promotion-succeed';
import { GetListPromotionFailedActionReducer } from './events/get-list-promotion-failed';

import {
  GetDetailPromotionActionReducer,
  GetDetailPromotionActionResetReducer,
} from './commands/get-detail-promotion';

import { GetDetailPromotionSucceedActionReducer } from './events/get-detail-promotion-succeed';
import { GetDetailPromotionFailedActionReducer } from './events/get-detail-promotion-failed';
import {
  GetCategoryPromotionActionReducer,
  GetCategoryPromotionActionResetReducer,
} from './commands/get-category-promotion';
import {
  GetCategoryPromotionFailed,
  GetCategoryPromotionFailedActionReducer,
} from './events/get-category-promotion-failed';
import { GetCategoryPromotionSucceedActionReducer } from './events/get-category-promotion-succeed';
import {
  GetCouponVerifyActionReducer,
  GetCouponVerifyActionResetReducer,
} from './commands/get-coupon-verify';
import { GetCouponVerifySucceedActionReducer } from './events/get-coupon-verify-succeed';
import { GetCouponVerifyFailedActionReducer } from './events/get-coupon-verify-failed';
import {
  SubmitCouponPromotionActionReducer,
  SubmitCouponPromotionActionResetReducer,
} from './commands/get-coupon-promotion';
import { SubmitCouponPromotionSucceedActionReducer } from './events/get-coupon-promotion-succeed';
import { SubmitCouponPromotionFailedActionReducer } from './events/get-coupon-promotion-failed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const MENU_PROMOTION_ACTION_REDUCERS = [
  GetPublicListPromotionActionReducer,
  GetPublicListPromotionActionResetReducer,

  GetListPromotionActionReducer,
  GetListPromotionActionResetReducer,

  GetListPromotionSucceedActionReducer,
  GetListPromotionFailedActionReducer,

  GetDetailPromotionActionReducer,
  GetDetailPromotionActionResetReducer,

  GetDetailPromotionSucceedActionReducer,
  GetDetailPromotionFailedActionReducer,

  GetCategoryPromotionActionReducer,
  GetCategoryPromotionActionResetReducer,

  GetCategoryPromotionFailedActionReducer,
  GetCategoryPromotionSucceedActionReducer,

  GetCouponVerifyActionReducer,
  GetCouponVerifyActionResetReducer,
  GetCouponVerifySucceedActionReducer,
  GetCouponVerifyFailedActionReducer,

  SubmitCouponPromotionActionReducer,
  SubmitCouponPromotionActionResetReducer,
  SubmitCouponPromotionSucceedActionReducer,
  SubmitCouponPromotionFailedActionReducer,

  ResetAllStateActionReducer,
];
