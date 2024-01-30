import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';

export const GetContentPromoFailed = createAction(
  'Services.Menu.Events.GetContentPromoFailed',
  props<{
    response: DataResponsePagination<any>;
    dataType: 'landing' | 'list';
  }>()
);

export const GetContentPromoFailedActionReducer = on(
  GetContentPromoFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetContentPromoFailedInteractionActionReducer = on(
  GetContentPromoFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        [dataType]: {
          ...state?.contentPromo?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
