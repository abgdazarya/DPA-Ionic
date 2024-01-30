import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { NoPesertaData } from '../../models/no-peserta-data';

export const GetNoPesertaFailed = createAction(
  'Services.Auth.Events.GetNoPesertaFailed',
  props<{ response: DataResponse<NoPesertaData> }>()
);

export const GetNoPesertaFailedActionReducer = on(
  GetNoPesertaFailed,
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

export const GetNoPesertaFailedInteractionActionReducer = on(
  GetNoPesertaFailed,
  (state: any, { response }) => {
    return {
      ...state,
      noPeserta: {
        ...state?.noPeserta,
        main: {
          ...state?.noPeserta?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
