import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { LupaPinData } from '../../models/lupa-pin-data';

export const LupaPinFailed = createAction(
  'Services.Auth.Events.LupaPinFailed',
  props<{ response: DataResponse<LupaPinData> }>()
);

export const LupaPinFailedActionReducer = on(LupaPinFailed, (state: any) => {
  return {
    ...state,
  };
});

export const LupaPinFailedInteractionActionReducer = on(
  LupaPinFailed,
  (state: any, { response }) => {
    return {
      ...state,
      lupaPin: {
        ...state?.lupaPin,
        main: {
          ...state?.lupaPin?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
