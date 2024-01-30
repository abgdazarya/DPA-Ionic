import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { KartuPesertaData } from '../../models/kartu-peserta';

export const KartuPesertaFailed = createAction(
  'Services.Profile.Events.GetKartuPesertaFailed',
  props<{ response: DataResponse<KartuPesertaData> }>()
);

export const KartuPesertaFailedActionReducer = on(KartuPesertaFailed, (state: any) => {
  return {
    ...state,
  };
});

export const KartuPesertaFailedInteractionActionReducer = on(
  KartuPesertaFailed,
  (state: any) => {
    return {
      ...state,
      kartuPeserta: {
        ...state?.kartuPeserta,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
