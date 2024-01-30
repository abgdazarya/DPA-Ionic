import {
  GetPublicListDpaTvActionReducer,
  GetPublicListDpaTvActionResetReducer,
} from './commands/get-public-list-dpa-tv';

import {
  GetListDpaTvActionReducer,
  GetListDpaTvActionResetReducer,
} from './commands/get-list-dpa-tv';

import { GetListDpaTvSucceedActionReducer } from './events/get-list-dpa-tv-succeed';
import { GetListDpaTvFailedActionReducer } from './events/get-list-dpa-tv-failed';

import {
  GetDetailDpaTvActionReducer,
  GetDetailDpaTvActionResetReducer,
} from './commands/get-detail-dpa-tv';

import { GetDetailDpaTvSucceedActionReducer } from './events/get-detail-dpa-tv-succeed';
import { GetDetailDpaTvFailedActionReducer } from './events/get-detail-dpa-tv-failed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const MENU_DPA_TV_ACTION_REDUCERS = [
  GetPublicListDpaTvActionReducer,
  GetPublicListDpaTvActionResetReducer,

  GetListDpaTvActionReducer,
  GetListDpaTvActionResetReducer,

  GetListDpaTvSucceedActionReducer,
  GetListDpaTvFailedActionReducer,

  GetDetailDpaTvActionReducer,
  GetDetailDpaTvActionResetReducer,

  GetDetailDpaTvSucceedActionReducer,
  GetDetailDpaTvFailedActionReducer,

  ResetAllStateActionReducer,
];
