import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailPromotion = createAction(
  'Services.Menu.Promotion.Commands.GetDetailPromotion',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailPromotionReset = createAction(
  'Services.Menu.Promotion.Commands.GetDetailPromotionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailPromotionInteractionReset = createAction(
  'Services.Menu.Promotion.Commands.GetDetailPromotionInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailPromotionActionReducer = on(
  GetDetailPromotion,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailPromotionActionResetReducer = on(
  GetDetailPromotionReset,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);

export const GetDetailPromotionInteractionActionReducer = on(
  GetDetailPromotion,
  (state: any, {}) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetDetailPromotionInteractionActionResetReducer = on(
  GetDetailPromotionInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);
