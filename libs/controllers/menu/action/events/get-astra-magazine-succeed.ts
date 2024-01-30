import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';

export const GetAstraMagazineSucceed = createAction(
  'Services.Menu.Events.GetAstraMagazineSucceed',
  props<{
    response: DataResponsePagination<any>;
    dataType: 'landing' | 'list';
  }>()
);

export const GetAstraMagazineSucceedActionReducer = on(
  GetAstraMagazineSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        [dataType]: {
          ...state?.astraMagazine?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetAstraMagazineSucceedInteractionActionReducer = on(
  GetAstraMagazineSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        [dataType]: {
          ...state?.astraMagazine?.[dataType],
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
