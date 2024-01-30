import { createAction, on } from '@ngrx/store';
import { MENU_LAPORAN_INVESTASI_INTERACTION_INITIAL_STATE } from '../../../../stores/laporan-investasi/states/menu-laporan-investasi.interaction.state';
import { MENU_LAPORAN_INVESTASI_INITIAL_STATE } from '../../../../stores/laporan-investasi/states/menu-laporan-investasi.state';

export const ResetAllState = createAction(
  'Services.LaporanInvestasi.States.ResetAllState'
);

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...MENU_LAPORAN_INVESTASI_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...MENU_LAPORAN_INVESTASI_INTERACTION_INITIAL_STATE,
    };
  }
);
