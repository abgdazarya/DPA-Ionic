import { InteractionState, INITIAL_INTERACTION_STATE } from '@shared';
import { OCRTokenData } from 'libs/controllers/profile/models/ocr-token.model';

interface LinkState {
  main: InteractionState;
}

interface ChangeContactInteractionState {
  main: InteractionState;
}
interface UploadPhotoInteractionState {
  main: InteractionState;
}

interface EditProfileInteractionState {
  main: InteractionState;
}

interface EditKerabatInteractionState {
  main: InteractionState;
}

interface RateInteractionState {
  main: InteractionState;
}

interface NotificationInteractionState {
  header: InteractionState;
  list: InteractionState;
}

interface ToggleEmailInteractionState {
  google: InteractionState;
  apple: InteractionState;
}

export interface ProfileInteractionState {
  // State Interface Here
  // Example createPin: InteractionState;
  userInfo: InteractionState;
  userDetail: InteractionState;
  kartuPeserta: InteractionState;
  notification: NotificationInteractionState;
  faq: InteractionState;
  readNotification: InteractionState;
  toggleNotification: InteractionState;
  toggleEmail: ToggleEmailInteractionState;
  toggleBiometric: InteractionState;
  rateReview: InteractionState;
  privacyPolicy: InteractionState;
  link: LinkState;
  changeContact: ChangeContactInteractionState;
  photo: UploadPhotoInteractionState;
  editProfile: EditProfileInteractionState;
  editKerabat: EditKerabatInteractionState;
  userRate: RateInteractionState;
  ocrToken: InteractionState;
  ocrKtp: InteractionState;
  areaMapping: InteractionState;
  faqCategory: InteractionState;
}

export const PROFILE_INITIAL_INTERACTION_STATE: ProfileInteractionState = {
  // State Here
  // Example createPin: INITIAL_INTERACTION_STATE;
  userInfo: INITIAL_INTERACTION_STATE,
  userDetail: INITIAL_INTERACTION_STATE,
  kartuPeserta: INITIAL_INTERACTION_STATE,
  notification: {
    header: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
  },
  faq: INITIAL_INTERACTION_STATE,
  readNotification: INITIAL_INTERACTION_STATE,
  toggleNotification: INITIAL_INTERACTION_STATE,
  toggleEmail: {
    apple: INITIAL_INTERACTION_STATE,
    google: INITIAL_INTERACTION_STATE,
  },
  toggleBiometric: INITIAL_INTERACTION_STATE,

  rateReview: INITIAL_INTERACTION_STATE,
  privacyPolicy: INITIAL_INTERACTION_STATE,
  link: { main: INITIAL_INTERACTION_STATE },
  changeContact: { main: INITIAL_INTERACTION_STATE },
  photo: { main: INITIAL_INTERACTION_STATE },
  editProfile: { main: INITIAL_INTERACTION_STATE },
  editKerabat: { main: INITIAL_INTERACTION_STATE },
  userRate: { main: INITIAL_INTERACTION_STATE },
  ocrToken: INITIAL_INTERACTION_STATE,
  ocrKtp: INITIAL_INTERACTION_STATE,
  areaMapping: INITIAL_INTERACTION_STATE,
  faqCategory: INITIAL_INTERACTION_STATE,
};
