import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

export interface MenuLaporanInvestasiInteractionState {
  landing: InteractionState;
  footer: InteractionState;
  list: InteractionState;
  detail: InteractionState;
  latest: InteractionState;
}

export const MENU_LAPORAN_INVESTASI_INTERACTION_INITIAL_STATE: MenuLaporanInvestasiInteractionState =
  {
    landing: INITIAL_INTERACTION_STATE,
    footer: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    latest: INITIAL_INTERACTION_STATE,
  };
