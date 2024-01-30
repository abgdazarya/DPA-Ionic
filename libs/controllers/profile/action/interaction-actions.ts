import { AreaMappingInteractionActionReducer } from './command/area-mapping';
import {
  ChangeContactInteractionActionReducer,
  ChangeContactInteractionActionResetReducer,
} from './command/change-contact';
import {
  EditKerabatInteractionActionReducer,
  EditKerabatInteractionActionResetReducer,
} from './command/edit-kerabat';
import {
  EditProfileInteractionActionReducer,
  EditProfileInteractionActionResetReducer,
} from './command/edit-profile';
import { FaqInteractionActionReducer } from './command/faq';
import { FaqCategoryInteractionActionReducer } from './command/faq-category';
import {
  GetLinkInteractionActionReducer,
  GetLinkInteractionActionResetReducer,
} from './command/get-link';
import {
  GetUserRateInteractionActionReducer,
  GetUserRateInteractionActionResetReducer,
} from './command/get-user-rate';
import { KartuPesertaInteractionActionReducer } from './command/kartu-peserta';
import {
  NotificationInteractionActionReducer,
  ResetNotificationInteractionActionReducer,
} from './command/notifications';
import {
  OcrKtpInteractionActionReducer,
  OcrKtpInteractionResetActionReducer,
} from './command/ocr-ktp';
import { OcrTokenInteractionActionReducer } from './command/ocr-token';
import { PrivacyPolicyInteractionActionReducer } from './command/privacy-policy';
import { RateReviewInteractionActionReducer } from './command/rate-review';
import { SetNotificationInteractionActionReducer } from './command/set-notification';
import { SetTokenFcmInteractionActionReducer } from './command/set-token-fcm';
import { ToggleBiometricInteractionActionReducer } from './command/toggle-biometric';
import { ToggleEmailInteractionActionReducer } from './command/toggle-email';
import { ToggleNotificationInteractionActionReducer } from './command/toggle-notification';
import {
  UploadPhotoInteractionActionReducer,
  UploadPhotoInteractionActionResetReducer,
} from './command/upload-photo';
import {
  UserDetailInteractionActionReducer,
  UserDetailInteractionActionResetReducer,
} from './command/user-detail';
import {
  UserInfoInteractionActionReducer,
  UserInfoInteractionActionResetReducer,
} from './command/user-profile';
import { AreaMappingFailedInteractionActionReducer } from './events/area-mapping-failed';
import { AreaMappingSucceedInteractionActionReducer } from './events/area-mapping-succeed';
import { ChangeContactFailedInteractionActionReducer } from './events/change-contact-failed';
import { ChangeContactSucceedInteractionActionReducer } from './events/change-contact-succeed';
import { EditKerabatFailedInteractionActionReducer } from './events/edit-kerabat-failed';
import { EditKerabatSucceedInteractionActionReducer } from './events/edit-kerabat-succeed';
import { EditProfileFailedInteractionActionReducer } from './events/edit-profile-failed';
import { EditProfileSucceedInteractionActionReducer } from './events/edit-profile-succeed';
import { FaqCategoryFailedInteractionActionReducer } from './events/faq-category-failed';
import { FaqCategorySucceedInteractionActionReducer } from './events/faq-category-succeed';
import { FaqFailedInteractionActionReducer } from './events/faq-failed';
import { FaqSucceedInteractionActionReducer } from './events/faq-succeed';
import { GetLinkFailedInteractionActionReducer } from './events/get-link-failed';
import { GetLinkSucceedInteractionActionReducer } from './events/get-link-succeed';
import { GetUserRateFailedInteractionActionReducer } from './events/get-user-rate-failed';
import { GetUserRateSucceedInteractionActionReducer } from './events/get-user-rate-succeed';
import { KartuPesertaFailedInteractionActionReducer } from './events/kartu-peserta-failed';
import { KartuPesertaSucceedInteractionActionReducer } from './events/kartu-peserta-succeed';
import { NotificationFailedInteractionActionReducer } from './events/notification-failed';
import { NotificationSucceedInteractionActionReducer } from './events/notification-succeed';
import { OcrKtpFailedInteractionActionReducer } from './events/ocr-ktp-failed';
import { OcrKtpSucceedInteractionActionReducer } from './events/ocr-ktp-succeed';
import { OcrTokenFailedInteractionActionReducer } from './events/ocr-token-failed';
import { OcrTokenSucceedInteractionActionReducer } from './events/ocr-token-succeed';
import { PrivacyPolicyFailedInteractionActionReducer } from './events/privacy-policy-failed';
import { PrivacyPolicySucceedInteractionActionReducer } from './events/privacy-policy-succeed';
import { RateReviewFailedInteractionActionReducer } from './events/rate-review-failed';
import { RateReviewSucceedInteractionActionReducer } from './events/rate-review-succeed';
import { SetNotificationFailedInteractionActionReducer } from './events/set-notification-failed';
import { SetNotificationSucceedInteractionActionReducer } from './events/set-notification-succeed';
import { SetTokenFcmFailedInteractionActionReducer } from './events/set-token-fcm-failed';
import { SetTokenFcmSucceedInteractionActionReducer } from './events/set-token-fcm-succeed';
import { ToggleBiometricFailedInteractionActionReducer } from './events/toggle-biometric-failed';
import { ToggleBiometricSucceedInteractionActionReducer } from './events/toggle-biometric-succeed';
import { ToggleEmailFailedInteractionActionReducer } from './events/toggle-email-failed';
import {
  ToggleEmailResetInteractionActionReducer,
  ToggleEmailSucceedInteractionActionReducer,
} from './events/toggle-email-succeed';
import { ToggleNotificationFailedInteractionActionReducer } from './events/toggle-notification-failed';
import { ToggleNotificationSucceedInteractionActionReducer } from './events/toggle-notification-succeed';
import { UploadPhotoFailedInteractionActionReducer } from './events/upload-photo-failed';
import { UploadPhotoSucceedInteractionActionReducer } from './events/upload-photo-succeed';
import { UserDetailFailedInteractionActionReducer } from './events/user-detail-failed';
import { UserDetailSucceedInteractionActionReducer } from './events/user-detail-succeed';
import { UserInfoFailedInteractionActionReducer } from './events/user-info-failed';
import { UserInfoSucceedInteractionActionReducer } from './events/user-info-succeed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const PROFILE_INTERACTION_ACTION_REDUCERS = [
  //  Reducers here
  UserInfoInteractionActionReducer,
  UserInfoSucceedInteractionActionReducer,
  UserInfoFailedInteractionActionReducer,
  UserInfoInteractionActionResetReducer,

  UserDetailInteractionActionReducer,
  UserDetailSucceedInteractionActionReducer,
  UserDetailFailedInteractionActionReducer,
  UserDetailInteractionActionResetReducer,

  NotificationInteractionActionReducer,
  NotificationSucceedInteractionActionReducer,
  NotificationFailedInteractionActionReducer,
  ResetNotificationInteractionActionReducer,

  KartuPesertaInteractionActionReducer,
  KartuPesertaSucceedInteractionActionReducer,
  KartuPesertaFailedInteractionActionReducer,

  FaqInteractionActionReducer,
  FaqSucceedInteractionActionReducer,
  FaqFailedInteractionActionReducer,

  SetNotificationInteractionActionReducer,
  SetNotificationSucceedInteractionActionReducer,
  SetNotificationFailedInteractionActionReducer,

  SetTokenFcmInteractionActionReducer,
  SetTokenFcmSucceedInteractionActionReducer,
  SetTokenFcmFailedInteractionActionReducer,

  ToggleNotificationInteractionActionReducer,
  ToggleNotificationSucceedInteractionActionReducer,
  ToggleNotificationFailedInteractionActionReducer,

  ToggleEmailInteractionActionReducer,
  ToggleEmailResetInteractionActionReducer,
  ToggleEmailSucceedInteractionActionReducer,
  ToggleEmailFailedInteractionActionReducer,

  EditProfileInteractionActionReducer,
  EditProfileSucceedInteractionActionReducer,
  EditProfileFailedInteractionActionReducer,
  EditProfileInteractionActionResetReducer,

  RateReviewInteractionActionReducer,
  RateReviewSucceedInteractionActionReducer,
  RateReviewFailedInteractionActionReducer,

  PrivacyPolicyInteractionActionReducer,
  PrivacyPolicySucceedInteractionActionReducer,
  PrivacyPolicyFailedInteractionActionReducer,

  GetLinkInteractionActionReducer,
  GetLinkSucceedInteractionActionReducer,
  GetLinkFailedInteractionActionReducer,
  GetLinkInteractionActionResetReducer,

  ChangeContactInteractionActionReducer,
  ChangeContactSucceedInteractionActionReducer,
  ChangeContactFailedInteractionActionReducer,
  ChangeContactInteractionActionResetReducer,

  UploadPhotoInteractionActionReducer,
  UploadPhotoSucceedInteractionActionReducer,
  UploadPhotoFailedInteractionActionReducer,
  UploadPhotoInteractionActionResetReducer,

  EditKerabatInteractionActionReducer,
  EditKerabatSucceedInteractionActionReducer,
  EditKerabatFailedInteractionActionReducer,
  EditKerabatInteractionActionResetReducer,

  GetUserRateInteractionActionReducer,
  GetUserRateSucceedInteractionActionReducer,
  GetUserRateFailedInteractionActionReducer,
  GetUserRateInteractionActionResetReducer,

  OcrTokenInteractionActionReducer,
  OcrTokenFailedInteractionActionReducer,
  OcrTokenSucceedInteractionActionReducer,

  OcrKtpInteractionActionReducer,
  OcrKtpFailedInteractionActionReducer,
  OcrKtpSucceedInteractionActionReducer,
  OcrKtpInteractionResetActionReducer,

  AreaMappingInteractionActionReducer,
  AreaMappingFailedInteractionActionReducer,
  AreaMappingSucceedInteractionActionReducer,

  FaqCategoryInteractionActionReducer,
  FaqCategorySucceedInteractionActionReducer,
  FaqCategoryFailedInteractionActionReducer,

  ToggleBiometricInteractionActionReducer,
  ToggleBiometricSucceedInteractionActionReducer,
  ToggleBiometricFailedInteractionActionReducer,

  ResetAllStateInteractionActionReducer,
];
