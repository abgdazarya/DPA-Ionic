import {
  GetPublicListNewsActionReducer,
  GetPublicListNewsActionResetReducer,
} from './commands/get-public-list-news';

import {
  GetListNewsActionReducer,
  GetListNewsActionResetReducer,
} from './commands/get-list-news';

import { GetListNewsSucceedActionReducer } from './events/get-list-news-succeed';
import { GetListNewsFailedActionReducer } from './events/get-list-news-failed';

import {
  GetDetailNewsActionReducer,
  GetDetailNewsActionResetReducer,
} from './commands/get-detail-news';

import { GetDetailNewsSucceedActionReducer } from './events/get-detail-news-succeed';
import { GetDetailNewsFailedActionReducer } from './events/get-detail-news-failed';

import {
  SetReadNewsActionReducer,
  SetReadNewsActionResetReducer,
} from './commands/set-read-news';

import { SetReadNewsSucceedActionReducer } from './events/set-read-news-succeed';
import { SetReadNewsFailedActionReducer } from './events/set-read-news-failed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const MENU_NEWS_ACTION_REDUCERS = [
  GetPublicListNewsActionReducer,
  GetPublicListNewsActionResetReducer,

  GetListNewsActionReducer,
  GetListNewsActionResetReducer,

  GetListNewsSucceedActionReducer,
  GetListNewsFailedActionReducer,

  GetDetailNewsActionReducer,
  GetDetailNewsActionResetReducer,

  GetDetailNewsSucceedActionReducer,
  GetDetailNewsFailedActionReducer,

  SetReadNewsActionReducer,
  SetReadNewsActionResetReducer,

  SetReadNewsSucceedActionReducer,
  SetReadNewsFailedActionReducer,

  ResetAllStateActionReducer,
];
