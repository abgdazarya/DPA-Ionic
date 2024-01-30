import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { PromotionModel } from '../../models/promotion.model';

export const GetDetailPromotionSucceed = createAction(
  'Services.Menu.Promotion.Events.GetDetailPromotionSucceed',
  props<{ response: DataResponse<PromotionModel> }>()
);

export const GetDetailPromotionSucceedActionReducer = on(
  GetDetailPromotionSucceed,
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

export const GetDetailPromotionSucceedInteractionActionReducer = on(
  GetDetailPromotionSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
