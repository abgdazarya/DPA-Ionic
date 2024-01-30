import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { AstramagzData } from '../../models/astra-magz';

export const GetDetailAstraMagazineFailed = createAction(
  'Services.Menu.Events.GetDetailAstraMagazineFailed',
  props<{ response: DataResponse<AstramagzData> }>()
);

export const GetDetailAstraMagazineFailedActionReducer = on(
  GetDetailAstraMagazineFailed,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailAstraMagazineFailedInteractionActionReducer = on(
  GetDetailAstraMagazineFailed,
  (state: any, { response }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        detail: {
          ...state?.astraMagazine?.detail,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
