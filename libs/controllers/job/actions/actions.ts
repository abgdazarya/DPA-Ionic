import {
  GetPublicListJobActionReducer,
  GetPublicListJobActionResetReducer,
} from './commands/get-public-list-job';

import {
  GetListJobActionReducer,
  GetListJobActionResetReducer,
} from './commands/get-list-job';

import { GetListJobSucceedActionReducer } from './events/get-list-job-succeed';
import { GetListJobFailedActionReducer } from './events/get-list-job-failed';

import {
  GetDetailJobActionReducer,
  GetDetailJobActionResetReducer,
} from './commands/get-detail-job';

import { GetDetailJobSucceedActionReducer } from './events/get-detail-job-succeed';
import { GetDetailJobFailedActionReducer } from './events/get-detail-job-failed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const MENU_JOB_ACTION_REDUCERS = [
  GetPublicListJobActionReducer,
  GetPublicListJobActionResetReducer,

  GetListJobActionReducer,
  GetListJobActionResetReducer,

  GetListJobSucceedActionReducer,
  GetListJobFailedActionReducer,

  GetDetailJobActionReducer,
  GetDetailJobActionResetReducer,

  GetDetailJobSucceedActionReducer,
  GetDetailJobFailedActionReducer,

  ResetAllStateActionReducer,
];
