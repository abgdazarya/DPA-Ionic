import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { HubDpaModel } from '../../models/hub-dpa.model';

export const GetHubDpaFailed = createAction(
  'Services.Menu.Events.GetHubDpaFailed',
  props<{ response: DataResponseArray<HubDpaModel> }>()
);

export const GetHubDpaFailedActionReducer = on(
  GetHubDpaFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetHubDpaFailedInteractionActionReducer = on(
  GetHubDpaFailed,
  (state: any, { response }) => {
    return {
      ...state,
      hubDpa: {
        ...state?.hubDpa,
        main: {
          ...state?.hubDpa?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
