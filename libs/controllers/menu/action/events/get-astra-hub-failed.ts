import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { AstraHubData } from '../../models/astra-hub';

export const GetAstraHubFailed = createAction(
  'Services.Auth.Events.GetAstraHubFailed',
  props<{ response: DataResponseArray<AstraHubData> }>()
);

export const GetAstraHubFailedActionReducer = on(
  GetAstraHubFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetAstraHubFailedInteractionActionReducer = on(
  GetAstraHubFailed,
  (state: any, { response }) => {
    return {
      ...state,
      astraHub: {
        ...state?.astraHub,
        main: {
          ...state?.astraHub?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
