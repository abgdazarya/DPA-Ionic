import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';

export const GetAstraMagazineFailed = createAction(
  'Services.Menu.Events.GetAstraMagazineFailed',
  props<{
    response: DataResponsePagination<any>;
    dataType: 'landing' | 'list';
  }>()
);

export const GetAstraMagazineFailedActionReducer = on(
  GetAstraMagazineFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetAstraMagazineFailedInteractionActionReducer = on(
  GetAstraMagazineFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        [dataType]: {
          ...state?.astraMagazine?.[dataType],
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
