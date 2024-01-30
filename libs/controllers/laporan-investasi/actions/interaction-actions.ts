import {
  GetPublicListLaporanInvestasiInteractionActionReducer,
  GetPublicListLaporanInvestasiInteractionActionResetReducer,
} from './commands/get-public-list-laporan-investasi';

import {
  GetListLaporanInvestasiInteractionActionReducer,
  GetListLaporanInvestasiInteractionActionResetReducer,
} from './commands/get-list-laporan-investasi';

import { GetListLaporanInvestasiSucceedInteractionActionReducer } from './events/get-list-laporan-investasi-succeed';
import { GetListLaporanInvestasiFailedInteractionActionReducer } from './events/get-list-laporan-investasi-failed';

import {
  GetDetailLaporanInvestasiInteractionActionReducer,
  GetDetailLaporanInvestasiInteractionActionResetReducer,
} from './commands/get-detail-laporan-investasi';

import { GetDetailLaporanInvestasiSucceedInteractionActionReducer } from './events/get-detail-laporan-investasi-succeed';
import { GetDetailLaporanInvestasiFailedInteractionActionReducer } from './events/get-detail-laporan-investasi-failed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const MENU_LAPORAN_INVESTASI_INTERACTION_ACTION_REDUCERS = [
  GetPublicListLaporanInvestasiInteractionActionReducer,
  GetPublicListLaporanInvestasiInteractionActionResetReducer,

  GetListLaporanInvestasiInteractionActionReducer,
  GetListLaporanInvestasiInteractionActionResetReducer,

  GetListLaporanInvestasiSucceedInteractionActionReducer,
  GetListLaporanInvestasiFailedInteractionActionReducer,

  GetDetailLaporanInvestasiInteractionActionReducer,
  GetDetailLaporanInvestasiInteractionActionResetReducer,

  GetDetailLaporanInvestasiSucceedInteractionActionReducer,
  GetDetailLaporanInvestasiFailedInteractionActionReducer,

  ResetAllStateInteractionActionReducer,
];
