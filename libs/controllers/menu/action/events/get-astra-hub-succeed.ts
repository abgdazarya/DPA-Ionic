import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { AstraHubData } from '../../models/astra-hub';

export const GetAstraHubSucceed = createAction(
  'Services.Auth.Events.GetAstraHubSucceed',
  props<{ response: DataResponseArray<AstraHubData> }>()
);

export const GetAstraHubSucceedActionReducer = on(
  GetAstraHubSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      astraHub: {
        ...state?.astraHub,
        main: {
          ...state?.astraHub?.main,
          ...response,
        },
      },
    };
  }
);

export const GetAstraHubSucceedInteractionActionReducer = on(
  GetAstraHubSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      astraHub: {
        ...state?.astraHub,
        main: {
          ...state?.astraHub?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
