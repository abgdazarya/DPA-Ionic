import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { NoPesertaData } from '../../models/no-peserta-data';

export const GetNoPesertaSucceed = createAction(
  'Services.Auth.Events.GetNoPesertaSucceed',
  props<{ response: DataResponseArray<NoPesertaData> }>()
);

export const GetNoPesertaSucceedActionReducer = on(
  GetNoPesertaSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      noPeserta: {
        ...state?.noPeserta,
        main: {
          ...state?.noPeserta?.main,
          ...response,
        },
      },
    };
  }
);

export const GetNoPesertaSucceedInteractionActionReducer = on(
  GetNoPesertaSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      noPeserta: {
        ...state?.noPeserta,
        main: {
          ...state?.noPeserta?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
