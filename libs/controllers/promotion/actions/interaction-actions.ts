import {
  GetPublicListPromotionInteractionActionReducer,
  GetPublicListPromotionInteractionActionResetReducer,
} from './commands/get-public-list-promotion';

import {
  GetListPromotionInteractionActionReducer,
  GetListPromotionInteractionActionResetReducer,
} from './commands/get-list-promotion';

import { GetListPromotionSucceedInteractionActionReducer } from './events/get-list-promotion-succeed';
import { GetListPromotionFailedInteractionActionReducer } from './events/get-list-promotion-failed';

import {
  GetDetailPromotionInteractionActionReducer,
  GetDetailPromotionInteractionActionResetReducer,
} from './commands/get-detail-promotion';

import { GetDetailPromotionSucceedInteractionActionReducer } from './events/get-detail-promotion-succeed';
import { GetDetailPromotionFailedInteractionActionReducer } from './events/get-detail-promotion-failed';
import {
  GetCategoryPromotionInteractionActionReducer,
  GetCategoryPromotionInteractionActionResetReducer,
} from './commands/get-category-promotion';
import { GetCategoryPromotionSucceedInteractionActionReducer } from './events/get-category-promotion-succeed';
import { GetCategoryPromotionFailedInteractionActionReducer } from './events/get-category-promotion-failed';
import {
  GetCouponVerifyInteractionActionReducer,
  GetCouponVerifyInteractionActionResetReducer,
} from './commands/get-coupon-verify';
import { GetCouponVerifyInteractionSucceedActionReducer } from './events/get-coupon-verify-succeed';
import { GetCouponVerifyInteractionFailedActionReducer } from './events/get-coupon-verify-failed';
import { SubmitCouponPromotionFailedInteractionActionReducer } from './events/get-coupon-promotion-failed';
import {
  SubmitCouponPromotionInteractionActionReducer,
  SubmitCouponPromotionInteractionActionResetReducer,
} from './commands/get-coupon-promotion';
import { SubmitCouponPromotionSucceedInteractionActionReducer } from './events/get-coupon-promotion-succeed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const MENU_PROMOTION_INTERACTION_ACTION_REDUCERS = [
  GetPublicListPromotionInteractionActionReducer,
  GetPublicListPromotionInteractionActionResetReducer,

  GetListPromotionInteractionActionReducer,
  GetListPromotionInteractionActionResetReducer,

  GetListPromotionSucceedInteractionActionReducer,
  GetListPromotionFailedInteractionActionReducer,

  GetDetailPromotionInteractionActionReducer,
  GetDetailPromotionInteractionActionResetReducer,

  GetDetailPromotionSucceedInteractionActionReducer,
  GetDetailPromotionFailedInteractionActionReducer,

  GetCategoryPromotionInteractionActionReducer,
  GetCategoryPromotionInteractionActionResetReducer,

  GetCategoryPromotionSucceedInteractionActionReducer,
  GetCategoryPromotionFailedInteractionActionReducer,

  GetCouponVerifyInteractionActionReducer,
  GetCouponVerifyInteractionActionResetReducer,
  GetCouponVerifyInteractionSucceedActionReducer,
  GetCouponVerifyInteractionFailedActionReducer,

  SubmitCouponPromotionFailedInteractionActionReducer,
  SubmitCouponPromotionInteractionActionReducer,
  SubmitCouponPromotionInteractionActionResetReducer,
  SubmitCouponPromotionSucceedInteractionActionReducer,

  ResetAllStateInteractionActionReducer,
];
