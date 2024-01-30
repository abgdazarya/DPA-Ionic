import {
  GetUserInfoActionReducer,
  GetUserInfoActionResetReducer,
} from './commands/get-user-info';
import { GetUserInfoFailedActionReducer } from './events/get-user-info-failed';
import { GetUserInfoSucceedActionReducer } from './events/get-user-info-succeed';

import {
  GetCustomPopupActionReducer,
  GetCustomPopupActionResetReducer,
} from './commands/get-custom-popup';
import { GetCustomPopupFailedActionReducer } from './events/get-custom-popup-failed';
import { GetCustomPopupSucceedActionReducer } from './events/get-custom-popup-succeed';

import {
  GetPopupBirthdayResignActionReducer,
  GetPopupBirthdayResignActionResetReducer,
} from './commands/get-popup-birthday-resign';
import { GetPopupBirthdayResignFailedActionReducer } from './events/get-popup-birthday-resign-failed';
import { GetPopupBirthdayResignSucceedActionReducer } from './events/get-popup-birthday-resign-succeed';

import {
  GetAksesMenuActionReducer,
  GetAksesMenuActionResetReducer,
} from './commands/get-akses-menu';
import { GetAksesMenuFailedActionReducer } from './events/get-akses-menu-failed';
import { GetAksesMenuSucceedActionReducer } from './events/get-akses-menu-succeed';

import {
  SaveCustomerConcernActionReducer,
  SaveCustomerConcernActionResetReducer,
} from './commands/save-customer-concern';
import { SaveCustomerConcernFailedActionReducer } from './events/save-customer-concern-failed';
import { SaveCustomerConcernSucceedActionReducer } from './events/save-customer-concern-succeed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const HOME_ACTION_REDUCERS = [
  GetUserInfoActionReducer,
  GetUserInfoSucceedActionReducer,
  GetUserInfoFailedActionReducer,
  GetUserInfoActionResetReducer,

  GetCustomPopupActionReducer,
  GetCustomPopupSucceedActionReducer,
  GetCustomPopupFailedActionReducer,
  GetCustomPopupActionResetReducer,

  GetPopupBirthdayResignActionReducer,
  GetPopupBirthdayResignSucceedActionReducer,
  GetPopupBirthdayResignFailedActionReducer,
  GetPopupBirthdayResignActionResetReducer,

  GetAksesMenuActionReducer,
  GetAksesMenuSucceedActionReducer,
  GetAksesMenuFailedActionReducer,
  GetAksesMenuActionResetReducer,

  SaveCustomerConcernActionReducer,
  SaveCustomerConcernSucceedActionReducer,
  SaveCustomerConcernFailedActionReducer,
  SaveCustomerConcernActionResetReducer,

  ResetAllStateActionReducer,
];
