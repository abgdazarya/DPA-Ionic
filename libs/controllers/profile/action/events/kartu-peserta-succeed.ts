import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { KartuPesertaData } from '../../models/kartu-peserta';

export const KartuPesertaSucceed = createAction(
  'Services.Profile.Events.GetKartuPesertaSucceed',
  props<{ response: DataResponse<KartuPesertaData> }>()
);

export const KartuPesertaSucceedActionReducer = on(
  KartuPesertaSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      kartuPeserta: {
        ...state?.kartuPeserta,
        data,
      },
    };
  }
);

export const KartuPesertaSucceedInteractionActionReducer = on(
  KartuPesertaSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      kartuPeserta: {
        ...state?.kartuPeserta,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
