import {
  GetPublicListLaporanInvestasiActionReducer,
  GetPublicListLaporanInvestasiActionResetReducer,
} from './commands/get-public-list-laporan-investasi';

import {
  GetListLaporanInvestasiActionReducer,
  GetListLaporanInvestasiActionResetReducer,
} from './commands/get-list-laporan-investasi';

import { GetListLaporanInvestasiSucceedActionReducer } from './events/get-list-laporan-investasi-succeed';
import { GetListLaporanInvestasiFailedActionReducer } from './events/get-list-laporan-investasi-failed';

import {
  GetDetailLaporanInvestasiActionReducer,
  GetDetailLaporanInvestasiActionResetReducer,
} from './commands/get-detail-laporan-investasi';

import { GetDetailLaporanInvestasiSucceedActionReducer } from './events/get-detail-laporan-investasi-succeed';
import { GetDetailLaporanInvestasiFailedActionReducer } from './events/get-detail-laporan-investasi-failed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const MENU_LAPORAN_INVESTASI_ACTION_REDUCERS = [
  GetPublicListLaporanInvestasiActionReducer,
  GetPublicListLaporanInvestasiActionResetReducer,

  GetListLaporanInvestasiActionReducer,
  GetListLaporanInvestasiActionResetReducer,

  GetListLaporanInvestasiSucceedActionReducer,
  GetListLaporanInvestasiFailedActionReducer,

  GetDetailLaporanInvestasiActionReducer,
  GetDetailLaporanInvestasiActionResetReducer,

  GetDetailLaporanInvestasiSucceedActionReducer,
  GetDetailLaporanInvestasiFailedActionReducer,

  ResetAllStateActionReducer,
];
