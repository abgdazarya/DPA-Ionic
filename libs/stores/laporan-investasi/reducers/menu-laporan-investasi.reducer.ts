import { MENU_LAPORAN_INVESTASI_ACTION_REDUCERS } from '@controllers/menu-laporan-investasi';
import { createReducer } from '@ngrx/store';
import {
  MENU_LAPORAN_INVESTASI_INITIAL_STATE,
  MenuLaporanInvestasiState,
} from '../states/menu-laporan-investasi.state';

export const menuLaporanInvestasiReducer =
  createReducer<MenuLaporanInvestasiState>(
    MENU_LAPORAN_INVESTASI_INITIAL_STATE,

    ...MENU_LAPORAN_INVESTASI_ACTION_REDUCERS
  );
