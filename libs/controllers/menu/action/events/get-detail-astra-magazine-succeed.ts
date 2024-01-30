import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AstramagzData } from '../../models/astra-magz';

export const GetDetailAstraMagazineSucceed = createAction(
  'Services.Menu.Events.GetDetailAstraMagazineSucceed',
  props<{ response: DataResponse<AstramagzData> }>()
);

export const GetDetailAstraMagazineSucceedActionReducer = on(
  GetDetailAstraMagazineSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        detail: {
          ...state?.astraMagazine?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailAstraMagazineSucceedInteractionActionReducer = on(
  GetDetailAstraMagazineSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        detail: {
          ...state?.astraMagazine?.detail,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
