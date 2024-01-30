import { Popup, UserInfo, AksesMenuModel } from '@controllers/home';
import { BaseProfile } from '@controllers/profile';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponseArray,
} from '@shared';

interface HomeUserInfoState {
  main: DataResponse<UserInfo> | undefined | null;
}

interface HomeCustomPopupState {
  main: DataResponseArray<Popup> | undefined | null;
}

interface HomePopupBirthdayResignState {
  main: DataResponseArray<Popup> | undefined | null;
}

interface HomeAksesMenuState {
  main: DataResponse<AksesMenuModel> | undefined | null;
}

interface HomeCustomerConcernState {
  main: DataResponse<BaseProfile> | undefined | null;
}

export interface HomeState {
  userInfo: HomeUserInfoState;
  customPopup: HomeCustomPopupState;
  birthdayPopup: HomePopupBirthdayResignState;
  aksesMenu: HomeAksesMenuState;
  customerConcern: HomeCustomerConcernState;
}

export const HOME_INITIAL_STATE: HomeState = {
  userInfo: { main: DATA_RESPONSE_INITIAL_STATE },
  customPopup: { main: DATA_RESPONSE_INITIAL_STATE },
  birthdayPopup: { main: DATA_RESPONSE_INITIAL_STATE },
  aksesMenu: { main: DATA_RESPONSE_INITIAL_STATE },
  customerConcern: { main: DATA_RESPONSE_INITIAL_STATE },
};
