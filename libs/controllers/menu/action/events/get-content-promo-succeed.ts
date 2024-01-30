import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';

export const GetContentPromoSucceed = createAction(
  'Services.Menu.Events.GetContentPromoSucceed',
  props<{
    response: DataResponsePagination<any>;
    dataType: 'landing' | 'list';
  }>()
);

export const GetContentPromoSucceedActionReducer = on(
  GetContentPromoSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        [dataType]: {
          ...state?.contentPromo?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetContentPromoSucceedInteractionActionReducer = on(
  GetContentPromoSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        [dataType]: {
          ...state?.contentPromo?.[dataType],
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
