import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ContentPromo } from '../../models/content-promo.model';

export const GetDetailContentPromoSucceed = createAction(
  'Services.Menu.Events.GetDetailContentPromoSucceed',
  props<{ response: DataResponse<ContentPromo> }>()
);

export const GetDetailContentPromoSucceedActionReducer = on(
  GetDetailContentPromoSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        detail: {
          ...state?.contentPromo?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailContentPromoSucceedInteractionActionReducer = on(
  GetDetailContentPromoSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        detail: {
          ...state?.contentPromo?.detail,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
