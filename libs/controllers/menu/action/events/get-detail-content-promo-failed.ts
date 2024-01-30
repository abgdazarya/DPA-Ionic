import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ContentPromo } from '../../models/content-promo.model';

export const GetDetailContentPromoFailed = createAction(
  'Services.Menu.Events.GetDetailContentPromoFailed',
  props<{ response: DataResponse<ContentPromo> }>()
);

export const GetDetailContentPromoFailedActionReducer = on(
  GetDetailContentPromoFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailContentPromoFailedInteractionActionReducer = on(
  GetDetailContentPromoFailed,
  (state: any, { response }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        detail: {
          ...state?.contentPromo?.detail,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
