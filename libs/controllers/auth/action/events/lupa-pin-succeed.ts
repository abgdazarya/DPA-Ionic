import { createAction, on, props } from '@ngrx/store';
import { LupaPinData } from '../../models/lupa-pin-data';
import { DataResponse, InteractionType } from '@shared';

export const LupaPinSucceed = createAction(
  'Services.Auth.Events.LupaPinSucceed',
  props<{ response: DataResponse<LupaPinData> }>()
);

export const LupaPinSucceedActionReducer = on(
  LupaPinSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      lupaPin: {
        ...state?.lupaPin,
        main: {
          ...state?.lupaPin?.main,
          ...response,
        },
      },
    };
  }
);

export const LupaPinSucceedInteractionActionReducer = on(
  LupaPinSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      lupaPin: {
        ...state?.lupaPin,
        main: {
          ...state?.lupaPin?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
