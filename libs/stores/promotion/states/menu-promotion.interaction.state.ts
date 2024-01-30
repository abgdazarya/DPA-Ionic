import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

export interface MenuPromotionInteractionState {
  landing: InteractionState;
  footer: InteractionState;
  list: InteractionState;
  detail: InteractionState;
  latest: InteractionState;
  categoryPromo: InteractionState;
  couponVerify: InteractionState;
  promotionCoupon: InteractionState;
}

export const MENU_PROMOTION_INTERACTION_INITIAL_STATE: MenuPromotionInteractionState =
  {
    landing: INITIAL_INTERACTION_STATE,
    footer: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    latest: INITIAL_INTERACTION_STATE,
    categoryPromo: INITIAL_INTERACTION_STATE,
    couponVerify: INITIAL_INTERACTION_STATE,
    promotionCoupon: INITIAL_INTERACTION_STATE,
  };
