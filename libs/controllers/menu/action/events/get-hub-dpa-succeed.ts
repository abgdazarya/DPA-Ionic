import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { HubDpaModel } from '../../models/hub-dpa.model';

export const GetHubDpaSucceed = createAction(
  'Services.Menu.Events.GetHubDpaSucceed',
  props<{ response: DataResponseArray<HubDpaModel> }>()
);

export const GetHubDpaSucceedActionReducer = on(
  GetHubDpaSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      hubDpa: {
        ...state?.hubDpa,
        main: {
          ...state?.hubDpa?.main,
          ...response,
        },
      },
    };
  }
);

export const GetHubDpaSucceedInteractionActionReducer = on(
  GetHubDpaSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      hubDpa: {
        ...state?.hubDpa,
        main: {
          ...state?.hubDpa?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
