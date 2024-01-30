import {
  GetPublicListAstramagazineInteractionActionReducer,
  GetPublicListAstramagazineInteractionActionResetReducer,
} from './commands/get-public-list-astramagazine';

import {
  GetListAstramagazineInteractionActionReducer,
  GetListAstramagazineInteractionActionResetReducer,
} from './commands/get-list-astramagazine';

import { GetListAstramagazineSucceedInteractionActionReducer } from './events/get-list-astramagazine-succeed';
import { GetListAstramagazineFailedInteractionActionReducer } from './events/get-list-astramagazine-failed';

import {
  GetDetailAstramagazineInteractionActionReducer,
  GetDetailAstramagazineInteractionActionResetReducer,
} from './commands/get-detail-astramagazine';

import { GetDetailAstramagazineSucceedInteractionActionReducer } from './events/get-detail-astramagazine-succeed';
import { GetDetailAstramagazineFailedInteractionActionReducer } from './events/get-detail-astramagazine-failed';

import {
  GetOptionAstramagazineInteractionActionReducer,
  GetOptionAstramagazineInteractionActionResetReducer,
} from './commands/get-option-astramagazine';

import { GetOptionAstramagazineSucceedInteractionActionReducer } from './events/get-option-astramagazine-succeed';
import { GetOptionAstramagazineFailedInteractionActionReducer } from './events/get-option-astramagazine-failed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const MENU_ASTRAMAGAZINE_INTERACTION_ACTION_REDUCERS = [
  GetPublicListAstramagazineInteractionActionReducer,
  GetPublicListAstramagazineInteractionActionResetReducer,

  GetListAstramagazineInteractionActionReducer,
  GetListAstramagazineInteractionActionResetReducer,

  GetListAstramagazineSucceedInteractionActionReducer,
  GetListAstramagazineFailedInteractionActionReducer,

  GetDetailAstramagazineInteractionActionReducer,
  GetDetailAstramagazineInteractionActionResetReducer,

  GetDetailAstramagazineSucceedInteractionActionReducer,
  GetDetailAstramagazineFailedInteractionActionReducer,

  GetOptionAstramagazineInteractionActionReducer,
  GetOptionAstramagazineInteractionActionResetReducer,

  GetOptionAstramagazineSucceedInteractionActionReducer,
  GetOptionAstramagazineFailedInteractionActionReducer,

  ResetAllStateInteractionActionReducer,
];
