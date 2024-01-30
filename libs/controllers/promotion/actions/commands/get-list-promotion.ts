import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { PromotionListDto } from '../../dtos/promotion-list.dto';

export const GetListPromotion = createAction(
  'Services.Menu.Promotion.Commands.GetListPromotion',
  props<{
    payload: PromotionListDto;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListPromotionReset = createAction(
  'Services.Menu.Promotion.Commands.GetListPromotionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListPromotionInteractionReset = createAction(
  'Services.Menu.Promotion.Commands.GetListPromotionInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListPromotionActionReducer = on(
  GetListPromotion,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetListPromotionActionResetReducer = on(
  GetListPromotionReset,
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

export const GetListPromotionInteractionActionReducer = on(
  GetListPromotion,
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

export const GetListPromotionInteractionActionResetReducer = on(
  GetListPromotionInteractionReset,
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
