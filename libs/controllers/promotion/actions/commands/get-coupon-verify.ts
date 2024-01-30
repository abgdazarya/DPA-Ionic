import { createAction, on, props } from '@ngrx/store';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';

export const GetCouponVerify = createAction(
  'Services.Menu.Promotion.Commands.GetCouponVerify',
  props<{ payload: any; async?: boolean }>()
);

export const GetCouponVerifyReset = createAction(
  'Services.Menu.Promotion.Commands.GetCouponVerifyReset',
  props<{ response: any; async?: boolean }>()
);

export const GetCouponVerifyInteractionReset = createAction(
  'Services.Menu.Promotion.Commands.GetCouponVerifyInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetCouponVerifyActionReducer = on(
  GetCouponVerify,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetCouponVerifyActionResetReducer = on(
  GetCouponVerifyReset,
  (state: any, { response }) => {
    return {
      ...state,
      couponVerify: {
        // ...state?.couponVerify,
        ...response,
        ...INITIAL_INTERACTION_STATE,
      },
    };
  }
);

export const GetCouponVerifyInteractionActionReducer = on(
  GetCouponVerify,
  (state: any, {}) => {
    return {
      ...state,
      couponVerify: {
        ...state?.couponVerify,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetCouponVerifyInteractionActionResetReducer = on(
  GetCouponVerifyInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      couponVerify: {
        // ...state?.couponVerify,
        ...response,
        ...INITIAL_INTERACTION_STATE,
      },
    };
  }
);
