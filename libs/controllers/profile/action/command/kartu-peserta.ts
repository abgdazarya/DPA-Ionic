import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { KartuPesertaDto } from '../../dtos/kartu-peserta.dto';

export const KartuPeserta = createAction(
  'Services.Profile.Commands.GetKartuPeserta',
  props<{ payload: KartuPesertaDto; async?: boolean }>()
);

export const KartuPesertaActionReducer = on(KartuPeserta, (state: any) => {
  return {
    ...state,
  };
});

export const KartuPesertaInteractionActionReducer = on(
  KartuPeserta,
  (state: any) => {
    return {
      ...state,
      kartuPeserta: {
        ...state?.kartuPeserta,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);
