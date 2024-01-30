import {
  GetUserInfoInteractionActionReducer,
  GetUserInfoInteractionActionResetReducer,
} from './commands/get-user-info';
import { GetUserInfoFailedInteractionActionReducer } from './events/get-user-info-failed';
import { GetUserInfoSucceedInteractionActionReducer } from './events/get-user-info-succeed';

import {
  GetCustomPopupInteractionActionReducer,
  GetCustomPopupInteractionActionResetReducer,
} from './commands/get-custom-popup';
import { GetCustomPopupFailedInteractionActionReducer } from './events/get-custom-popup-failed';
import { GetCustomPopupSucceedInteractionActionReducer } from './events/get-custom-popup-succeed';

import {
  GetPopupBirthdayResignInteractionActionReducer,
  GetPopupBirthdayResignInteractionActionResetReducer,
} from './commands/get-popup-birthday-resign';
import { GetPopupBirthdayResignFailedInteractionActionReducer } from './events/get-popup-birthday-resign-failed';
import { GetPopupBirthdayResignSucceedInteractionActionReducer } from './events/get-popup-birthday-resign-succeed';

import {
  GetAksesMenuInteractionActionReducer,
  GetAksesMenuInteractionActionResetReducer,
} from './commands/get-akses-menu';
import { GetAksesMenuFailedInteractionActionReducer } from './events/get-akses-menu-failed';
import { GetAksesMenuSucceedInteractionActionReducer } from './events/get-akses-menu-succeed';

import {
  SaveCustomerConcernInteractionActionReducer,
  SaveCustomerConcernInteractionActionResetReducer,
} from './commands/save-customer-concern';
import { SaveCustomerConcernFailedInteractionActionReducer } from './events/save-customer-concern-failed';
import { SaveCustomerConcernSucceedInteractionActionReducer } from './events/save-customer-concern-succeed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const HOME_INTERACTION_ACTION_REDUCERS = [
  GetUserInfoInteractionActionReducer,
  GetUserInfoSucceedInteractionActionReducer,
  GetUserInfoFailedInteractionActionReducer,
  GetUserInfoInteractionActionResetReducer,

  GetCustomPopupInteractionActionReducer,
  GetCustomPopupSucceedInteractionActionReducer,
  GetCustomPopupFailedInteractionActionReducer,
  GetCustomPopupInteractionActionResetReducer,

  GetPopupBirthdayResignInteractionActionReducer,
  GetPopupBirthdayResignSucceedInteractionActionReducer,
  GetPopupBirthdayResignFailedInteractionActionReducer,
  GetPopupBirthdayResignInteractionActionResetReducer,

  GetAksesMenuInteractionActionReducer,
  GetAksesMenuSucceedInteractionActionReducer,
  GetAksesMenuFailedInteractionActionReducer,
  GetAksesMenuInteractionActionResetReducer,

  SaveCustomerConcernInteractionActionReducer,
  SaveCustomerConcernSucceedInteractionActionReducer,
  SaveCustomerConcernFailedInteractionActionReducer,
  SaveCustomerConcernInteractionActionResetReducer,

  ResetAllStateInteractionActionReducer,
];
