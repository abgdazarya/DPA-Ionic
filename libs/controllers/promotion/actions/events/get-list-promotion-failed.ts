import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { PromotionModel } from '../../models/promotion.model';

export const GetListPromotionFailed = createAction(
  'Services.Menu.Promotion.Events.GetListPromotionFailed',
  props<{
    response: DataResponsePagination<PromotionModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
  }>()
);

export const GetListPromotionFailedActionReducer = on(
  GetListPromotionFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,

      [dataType]: {
        ...state?.[dataType],
        response: {
          ...response,
          data: state?.[dataType].data,
        },
        // ...response,
      },
    };
  }
);

export const GetListPromotionFailedInteractionActionReducer = on(
  GetListPromotionFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
