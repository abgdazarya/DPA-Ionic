import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicListPromotion = createAction(
  'Services.Menu.Promotion.Commands.GetPublicListPromotion',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListPromotionReset = createAction(
  'Services.Menu.Promotion.Commands.GetPublicListPromotionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListPromotionInteractionReset = createAction(
  'Services.Menu.Promotion.Commands.GetPublicListPromotionInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListPromotionActionReducer = on(
  GetPublicListPromotion,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListPromotionActionResetReducer = on(
  GetPublicListPromotionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        ...response,
        data: { data: [] },
      },
    };
  }
);

export const GetPublicListPromotionInteractionActionReducer = on(
  GetPublicListPromotion,
  (state: any, { dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetPublicListPromotionInteractionActionResetReducer = on(
  GetPublicListPromotionInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        ...response,
      },
    };
  }
);
