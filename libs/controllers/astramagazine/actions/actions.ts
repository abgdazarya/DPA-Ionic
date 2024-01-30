import {
  GetPublicListAstramagazineActionReducer,
  GetPublicListAstramagazineActionResetReducer,
} from './commands/get-public-list-astramagazine';

import {
  GetListAstramagazineActionReducer,
  GetListAstramagazineActionResetReducer,
} from './commands/get-list-astramagazine';

import { GetListAstramagazineSucceedActionReducer } from './events/get-list-astramagazine-succeed';
import { GetListAstramagazineFailedActionReducer } from './events/get-list-astramagazine-failed';

import {
  GetDetailAstramagazineActionReducer,
  GetDetailAstramagazineActionResetReducer,
} from './commands/get-detail-astramagazine';

import { GetDetailAstramagazineSucceedActionReducer } from './events/get-detail-astramagazine-succeed';
import { GetDetailAstramagazineFailedActionReducer } from './events/get-detail-astramagazine-failed';

import {
  GetOptionAstramagazineActionReducer,
  GetOptionAstramagazineActionResetReducer,
} from './commands/get-option-astramagazine';

import { GetOptionAstramagazineSucceedActionReducer } from './events/get-option-astramagazine-succeed';
import { GetOptionAstramagazineFailedActionReducer } from './events/get-option-astramagazine-failed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const MENU_ASTRAMAGAZINE_ACTION_REDUCERS = [
  GetPublicListAstramagazineActionReducer,
  GetPublicListAstramagazineActionResetReducer,

  GetListAstramagazineActionReducer,
  GetListAstramagazineActionResetReducer,

  GetListAstramagazineSucceedActionReducer,
  GetListAstramagazineFailedActionReducer,

  GetDetailAstramagazineActionReducer,
  GetDetailAstramagazineActionResetReducer,

  GetDetailAstramagazineSucceedActionReducer,
  GetDetailAstramagazineFailedActionReducer,

  GetOptionAstramagazineActionReducer,
  GetOptionAstramagazineActionResetReducer,

  GetOptionAstramagazineSucceedActionReducer,
  GetOptionAstramagazineFailedActionReducer,

  ResetAllStateActionReducer,
];
