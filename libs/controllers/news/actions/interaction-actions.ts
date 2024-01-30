import {
  GetPublicListNewsInteractionActionReducer,
  GetPublicListNewsInteractionActionResetReducer,
} from './commands/get-public-list-news';

import {
  GetListNewsInteractionActionReducer,
  GetListNewsInteractionActionResetReducer,
} from './commands/get-list-news';

import { GetListNewsSucceedInteractionActionReducer } from './events/get-list-news-succeed';
import { GetListNewsFailedInteractionActionReducer } from './events/get-list-news-failed';

import {
  GetDetailNewsInteractionActionReducer,
  GetDetailNewsInteractionActionResetReducer,
} from './commands/get-detail-news';

import { GetDetailNewsSucceedInteractionActionReducer } from './events/get-detail-news-succeed';
import { GetDetailNewsFailedInteractionActionReducer } from './events/get-detail-news-failed';

import {
  SetReadNewsInteractionActionReducer,
  SetReadNewsInteractionActionResetReducer,
} from './commands/set-read-news';

import { SetReadNewsSucceedInteractionActionReducer } from './events/set-read-news-succeed';
import { SetReadNewsFailedInteractionActionReducer } from './events/set-read-news-failed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const MENU_NEWS_INTERACTION_ACTION_REDUCERS = [
  GetPublicListNewsInteractionActionReducer,
  GetPublicListNewsInteractionActionResetReducer,

  GetListNewsInteractionActionReducer,
  GetListNewsInteractionActionResetReducer,

  GetListNewsSucceedInteractionActionReducer,
  GetListNewsFailedInteractionActionReducer,

  GetDetailNewsInteractionActionReducer,
  GetDetailNewsInteractionActionResetReducer,

  GetDetailNewsSucceedInteractionActionReducer,
  GetDetailNewsFailedInteractionActionReducer,

  SetReadNewsInteractionActionReducer,
  SetReadNewsInteractionActionResetReducer,

  SetReadNewsSucceedInteractionActionReducer,
  SetReadNewsFailedInteractionActionReducer,

  ResetAllStateInteractionActionReducer,
];
