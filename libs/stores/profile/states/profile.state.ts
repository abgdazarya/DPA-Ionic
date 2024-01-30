import {
  EditKerabatData,
  LinkData,
  UploadPhotoData,
} from '@controllers/profile';
import {
  DataResponse,
  DATA_RESPONSE_INITIAL_STATE,
  DataResponseArray,
  DataResponsePagination,
} from '@shared';
import {
  AreaMappingData,
  AreaMappingDataArray,
} from 'libs/controllers/profile/models/area-mapping.model';
import { ChangeContactData } from 'libs/controllers/profile/models/change-contact';
import { FaqData } from 'libs/controllers/profile/models/faq';
import { FaqCategoryData } from 'libs/controllers/profile/models/faq-category';
import { KartuPesertaData } from 'libs/controllers/profile/models/kartu-peserta';
import { NotificationData } from 'libs/controllers/profile/models/notification';
import { OCRTokenData } from 'libs/controllers/profile/models/ocr-token.model';
import { OCRData } from 'libs/controllers/profile/models/ocr.model';
import { PrivacyData } from 'libs/controllers/profile/models/privacy';
import {
  BaseProfile,
  DetailProfile,
} from 'libs/controllers/profile/models/profile';
import { RateData, UserRateData } from 'libs/controllers/profile/models/rate';
import { ReadNotification } from 'libs/controllers/profile/models/read-notification';
import { ToggleEmailData } from 'libs/controllers/profile/models/toggle-email';
import { ToggleNotificationData } from 'libs/controllers/profile/models/toggle-notification';

interface UserInfoState {
  data: BaseProfile | undefined | null;
}

interface UserDetailState {
  data: DetailProfile | undefined | null;
}

interface KartuPesertaState {
  data: KartuPesertaData | undefined | null;
}

interface NotificationState {
  header: DataResponsePagination<NotificationData> | undefined | null;
  list: DataResponsePagination<NotificationData> | undefined | null;
}

interface FaqState {
  data: FaqData[] | undefined | null;
}

interface ReadNotificationState {
  data: ReadNotification | undefined | null;
}

interface ToggleNotificationState {
  data: ToggleNotificationData | undefined | null;
}

interface ToggleEmailState {
  google: ToggleEmailData | undefined | null;
  apple: ToggleEmailData | undefined | null;
}

interface ToggleBiometricState {
  data: ToggleEmailData | undefined | null;
}

interface RateReviewState {
  data: RateData | undefined | null;
}

interface PrivacyPolicyState {
  data: PrivacyData[] | undefined | null;
}

interface LinkState {
  main: DataResponse<LinkData> | undefined | null;
}

interface ChangeContactState {
  main: DataResponse<ChangeContactData> | undefined | null;
}

interface UploadPhotoState {
  main: DataResponse<UploadPhotoData> | undefined | null;
}

interface EditProfileState {
  main: DataResponse<DetailProfile> | undefined | null;
}

interface EditKerabatState {
  main: DataResponse<EditKerabatData> | undefined | null;
}

interface RateState {
  main: DataResponse<UserRateData> | undefined | null;
}

export interface ProfileState {
  // State Interface Here
  // Example createPin: State;

  userInfo: UserInfoState;
  userDetail: UserDetailState;
  kartuPeserta: KartuPesertaState;
  notification: NotificationState;
  faq: FaqState;
  readNotification: ReadNotificationState;
  toggleNotification: ToggleNotificationState;
  toggleEmail: ToggleEmailState;
  toggleBiometric: ToggleBiometricState;
  rateReview: RateReviewState;
  privacyPolicy: PrivacyPolicyState;
  link: LinkState;
  changeContact: ChangeContactState;
  photo: UploadPhotoState;
  editProfile: EditProfileState;
  editKerabat: EditKerabatState;
  userRate: RateState;
  ocrToken: OCRTokenData | any;
  ocrKtp: OCRData | any;
  areaMapping: AreaMappingDataArray | undefined | null;
  kerabatMapping: any;
  faqCategory: DataResponseArray<FaqCategoryData> | any;
}

export const PROFILE_INITIAL_STATE: ProfileState = {
  // State Here
  // Example createPin: INITIAL_STATE;
  userInfo: { data: undefined },
  userDetail: { data: undefined },
  kartuPeserta: { data: undefined },
  notification: { header: undefined, list: undefined },
  faq: { data: undefined },
  readNotification: { data: undefined },
  toggleNotification: { data: undefined },
  toggleEmail: {
    apple: undefined,
    google: undefined,
  },
  toggleBiometric: { data: undefined },
  rateReview: { data: undefined },
  privacyPolicy: { data: undefined },
  link: { main: DATA_RESPONSE_INITIAL_STATE },
  changeContact: { main: DATA_RESPONSE_INITIAL_STATE },
  photo: { main: DATA_RESPONSE_INITIAL_STATE },
  editProfile: { main: DATA_RESPONSE_INITIAL_STATE },
  editKerabat: { main: DATA_RESPONSE_INITIAL_STATE },
  userRate: { main: DATA_RESPONSE_INITIAL_STATE },
  ocrToken: {},
  ocrKtp: {},
  areaMapping: {
    // provinsi: [],
    // kabupaten: [],
    // kecamatan: [],
    // desa: [],
  },
  kerabatMapping: [],
  faqCategory: [],
};
