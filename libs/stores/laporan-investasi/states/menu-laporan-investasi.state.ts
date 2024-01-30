import { LaporanInvestasiModel } from '@controllers/menu-laporan-investasi';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponseArray,
} from '@shared';

export interface MenuLaporanInvestasiState {
  landing: DataResponseArray<LaporanInvestasiModel> | undefined | null;
  footer: DataResponseArray<LaporanInvestasiModel> | undefined | null;
  list: DataResponseArray<LaporanInvestasiModel> | undefined | null;
  detail: DataResponse<LaporanInvestasiModel> | undefined | null;
  latest: DataResponseArray<LaporanInvestasiModel> | undefined | null;
}

export const MENU_LAPORAN_INVESTASI_INITIAL_STATE: MenuLaporanInvestasiState = {
  landing: DATA_RESPONSE_INITIAL_STATE,
  footer: DATA_RESPONSE_INITIAL_STATE,
  list: DATA_RESPONSE_INITIAL_STATE,
  detail: DATA_RESPONSE_INITIAL_STATE,
  latest: DATA_RESPONSE_INITIAL_STATE,
};
