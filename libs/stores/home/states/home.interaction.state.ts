import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

interface UserInfoState {
  main: InteractionState;
}

interface CustomPopupState {
  main: InteractionState;
}

interface PopupBirthdayResignState {
  main: InteractionState;
}

interface AksesMenuState {
  main: InteractionState;
}

interface CustomerConcernState {
  main: InteractionState;
}

export interface HomeInteractionState {
  userInfo: UserInfoState;
  customPopup: CustomPopupState;
  birthdayPopup: PopupBirthdayResignState;
  aksesMenu: PopupBirthdayResignState;
  customerConcern: CustomerConcernState;
}

export const HOME_INITIAL_INTERACTION_STATE: HomeInteractionState = {
  userInfo: { main: INITIAL_INTERACTION_STATE },
  customPopup: { main: INITIAL_INTERACTION_STATE },
  birthdayPopup: { main: INITIAL_INTERACTION_STATE },
  aksesMenu: { main: INITIAL_INTERACTION_STATE },
  customerConcern: { main: INITIAL_INTERACTION_STATE },
};
