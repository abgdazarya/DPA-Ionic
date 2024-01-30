import { MENU_LAPORAN_INVESTASI_INTERACTION_ACTION_REDUCERS } from '@controllers/menu-laporan-investasi';
import { createReducer } from '@ngrx/store';
import { MENU_LAPORAN_INVESTASI_INTERACTION_INITIAL_STATE } from '../states/menu-laporan-investasi.interaction.state';

export const menuLaporanInvestasiInteractionReducer = createReducer(
  MENU_LAPORAN_INVESTASI_INTERACTION_INITIAL_STATE,

  ...MENU_LAPORAN_INVESTASI_INTERACTION_ACTION_REDUCERS
);
