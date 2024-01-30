import {
  GetPublicListDpaTvInteractionActionReducer,
  GetPublicListDpaTvInteractionActionResetReducer,
} from './commands/get-public-list-dpa-tv';

import {
  GetListDpaTvInteractionActionReducer,
  GetListDpaTvInteractionActionResetReducer,
} from './commands/get-list-dpa-tv';

import { GetListDpaTvFailedInteractionActionReducer } from './events/get-list-dpa-tv-failed';
import { GetListDpaTvSucceedInteractionActionReducer } from './events/get-list-dpa-tv-succeed';

import {
  GetDetailDpaTvInteractionActionReducer,
  GetDetailDpaTvInteractionActionResetReducer,
} from './commands/get-detail-dpa-tv';

import { GetDetailDpaTvFailedInteractionActionReducer } from './events/get-detail-dpa-tv-failed';
import { GetDetailDpaTvSucceedInteractionActionReducer } from './events/get-detail-dpa-tv-succeed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const MENU_DPA_TV_INTERACTION_ACTION_REDUCERS = [
  GetPublicListDpaTvInteractionActionReducer,
  GetPublicListDpaTvInteractionActionResetReducer,

  GetListDpaTvInteractionActionReducer,
  GetListDpaTvInteractionActionResetReducer,

  GetListDpaTvSucceedInteractionActionReducer,
  GetListDpaTvFailedInteractionActionReducer,

  GetDetailDpaTvInteractionActionReducer,
  GetDetailDpaTvInteractionActionResetReducer,

  GetDetailDpaTvSucceedInteractionActionReducer,
  GetDetailDpaTvFailedInteractionActionReducer,

  ResetAllStateInteractionActionReducer,
];
