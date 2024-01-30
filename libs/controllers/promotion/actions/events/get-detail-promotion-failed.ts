import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { PromotionModel } from '../../models/promotion.model';

export const GetDetailPromotionFailed = createAction(
  'Services.Menu.Promotion.Events.GetDetailPromotionFailed',
  props<{ response: DataResponse<PromotionModel> }>()
);

export const GetDetailPromotionFailedActionReducer = on(
  GetDetailPromotionFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailPromotionFailedInteractionActionReducer = on(
  GetDetailPromotionFailed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
