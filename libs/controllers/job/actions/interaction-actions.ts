import {
  GetPublicListJobInteractionActionReducer,
  GetPublicListJobInteractionActionResetReducer,
} from './commands/get-public-list-job';

import {
  GetListJobInteractionActionReducer,
  GetListJobInteractionActionResetReducer,
} from './commands/get-list-job';

import { GetListJobSucceedInteractionActionReducer } from './events/get-list-job-succeed';
import { GetListJobFailedInteractionActionReducer } from './events/get-list-job-failed';

import {
  GetDetailJobInteractionActionReducer,
  GetDetailJobInteractionActionResetReducer,
} from './commands/get-detail-job';

import { GetDetailJobSucceedInteractionActionReducer } from './events/get-detail-job-succeed';
import { GetDetailJobFailedInteractionActionReducer } from './events/get-detail-job-failed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const MENU_JOB_INTERACTION_ACTION_REDUCERS = [
  GetPublicListJobInteractionActionReducer,
  GetPublicListJobInteractionActionResetReducer,

  GetListJobInteractionActionReducer,
  GetListJobInteractionActionResetReducer,

  GetListJobSucceedInteractionActionReducer,
  GetListJobFailedInteractionActionReducer,

  GetDetailJobInteractionActionReducer,
  GetDetailJobInteractionActionResetReducer,

  GetDetailJobSucceedInteractionActionReducer,
  GetDetailJobFailedInteractionActionReducer,

  ResetAllStateInteractionActionReducer,
];
