import { AreaMappingActionReducer } from './command/area-mapping';
import {
  ChangeContactActionReducer,
  ChangeContactActionResetReducer,
} from './command/change-contact';
import {
  EditKerabatActionReducer,
  EditKerabatActionResetReducer,
} from './command/edit-kerabat';
import {
  EditProfileActionReducer,
  EditProfileActionResetReducer,
} from './command/edit-profile';
import { FaqActionReducer } from './command/faq';
import { FaqCategoryActionReducer } from './command/faq-category';
import {
  GetLinkActionReducer,
  GetLinkActionResetReducer,
} from './command/get-link';
import {
  GetUserRateActionReducer,
  GetUserRateActionResetReducer,
} from './command/get-user-rate';
import { KartuPesertaActionReducer } from './command/kartu-peserta';
import {
  NotificationActionReducer,
  ResetNotificationActionReducer,
} from './command/notifications';
import { OcrKtpActionReducer } from './command/ocr-ktp';
import { OcrTokenActionReducer } from './command/ocr-token';
import { PrivacyPolicyActionReducer } from './command/privacy-policy';
import { RateReviewActionReducer } from './command/rate-review';
import { SetNotificationActionReducer } from './command/set-notification';
import { SetTokenFcmActionReducer } from './command/set-token-fcm';
import { ToggleBiometricActionReducer } from './command/toggle-biometric';
import { ToggleEmailActionReducer } from './command/toggle-email';
import { ToggleNotificationActionReducer } from './command/toggle-notification';
import {
  UploadPhotoActionReducer,
  UploadPhotoActionResetReducer,
} from './command/upload-photo';
import {
  UserDetailActionReducer,
  UserDetailActionResetReducer,
} from './command/user-detail';
import {
  UserInfoActionReducer,
  UserInfoActionResetReducer,
} from './command/user-profile';
import { ResetAllStateActionReducer } from './states/reset-all-state';
import { AreaMappingFailedActionReducer } from './events/area-mapping-failed';
import { AreaMappingSucceedActionReducer } from './events/area-mapping-succeed';
import { ChangeContactFailedActionReducer } from './events/change-contact-failed';
import { ChangeContactSucceedActionReducer } from './events/change-contact-succeed';
import { EditKerabatFailedActionReducer } from './events/edit-kerabat-failed';
import { EditKerabatSucceedActionReducer } from './events/edit-kerabat-succeed';
import { EditProfileFailedActionReducer } from './events/edit-profile-failed';
import { EditProfileSucceedActionReducer } from './events/edit-profile-succeed';
import { FaqCategoryFailedActionReducer } from './events/faq-category-failed';
import { FaqCategorySucceedActionReducer } from './events/faq-category-succeed';
import { FaqFailedActionReducer } from './events/faq-failed';
import { FaqSucceedActionReducer } from './events/faq-succeed';
import { GetLinkFailedActionReducer } from './events/get-link-failed';
import { GetLinkSucceedActionReducer } from './events/get-link-succeed';
import { GetUserRateFailedActionReducer } from './events/get-user-rate-failed';
import { GetUserRateSucceedActionReducer } from './events/get-user-rate-succeed';
import { KartuPesertaFailedActionReducer } from './events/kartu-peserta-failed';
import { KartuPesertaSucceedActionReducer } from './events/kartu-peserta-succeed';
import { NotificationFailedActionReducer } from './events/notification-failed';
import { NotificationSucceedActionReducer } from './events/notification-succeed';
import { OcrKtpFailedActionReducer } from './events/ocr-ktp-failed';
import { OcrKtpSucceedActionReducer } from './events/ocr-ktp-succeed';
import { OcrTokenFailedActionReducer } from './events/ocr-token-failed';
import { OcrTokenSucceedActionReducer } from './events/ocr-token-succeed';
import { PrivacyPolicyFailedActionReducer } from './events/privacy-policy-failed';
import { PrivacyPolicySucceedActionReducer } from './events/privacy-policy-succeed';
import { RateReviewFailedActionReducer } from './events/rate-review-failed';
import { RateReviewSucceedActionReducer } from './events/rate-review-succeed';
import { SetNotificationFailedActionReducer } from './events/set-notification-failed';
import { SetNotificationSucceedActionReducer } from './events/set-notification-succeed';
import { SetTokenFcmFailedActionReducer } from './events/set-token-fcm-failed';
import { SetTokenFcmSucceedActionReducer } from './events/set-token-fcm-succeed';
import { ToggleBiometricFailedActionReducer } from './events/toggle-biometric-failed';
import { ToggleBiometricSucceedActionReducer } from './events/toggle-biometric-succeed';
import { ToggleEmailFailedActionReducer } from './events/toggle-email-failed';
import {
  ToggleEmailResetActionReducer,
  ToggleEmailSucceedActionReducer,
} from './events/toggle-email-succeed';
import { ToggleNotificationFailedActionReducer } from './events/toggle-notification-failed';
import { ToggleNotificationSucceedActionReducer } from './events/toggle-notification-succeed';
import { UploadPhotoFailedActionReducer } from './events/upload-photo-failed';
import { UploadPhotoSucceedActionReducer } from './events/upload-photo-succeed';
import { UserDetailFailedActionReducer } from './events/user-detail-failed';
import { UserDetailSucceedActionReducer } from './events/user-detail-succeed';
import { UserInfoFailedActionReducer } from './events/user-info-failed';
import { UserInfoSucceedActionReducer } from './events/user-info-succeed';

export const PROFILE_ACTION_REDUCERS = [
  //  Reducers here
  UserInfoActionReducer,
  UserInfoSucceedActionReducer,
  UserInfoFailedActionReducer,
  UserInfoActionResetReducer,

  UserDetailActionReducer,
  UserDetailSucceedActionReducer,
  UserDetailFailedActionReducer,
  UserDetailActionResetReducer,

  NotificationActionReducer,
  NotificationSucceedActionReducer,
  NotificationFailedActionReducer,
  ResetNotificationActionReducer,

  KartuPesertaActionReducer,
  KartuPesertaSucceedActionReducer,
  KartuPesertaFailedActionReducer,

  FaqActionReducer,
  FaqSucceedActionReducer,
  FaqFailedActionReducer,

  SetNotificationActionReducer,
  SetNotificationSucceedActionReducer,
  SetNotificationFailedActionReducer,

  SetTokenFcmActionReducer,
  SetTokenFcmSucceedActionReducer,
  SetTokenFcmFailedActionReducer,

  ToggleNotificationActionReducer,
  ToggleNotificationSucceedActionReducer,
  ToggleNotificationFailedActionReducer,

  ToggleEmailActionReducer,
  ToggleEmailResetActionReducer,
  ToggleEmailSucceedActionReducer,
  ToggleEmailFailedActionReducer,

  EditProfileActionReducer,
  EditProfileSucceedActionReducer,
  EditProfileFailedActionReducer,
  EditProfileActionResetReducer,

  RateReviewActionReducer,
  RateReviewSucceedActionReducer,
  RateReviewFailedActionReducer,

  PrivacyPolicyActionReducer,
  PrivacyPolicySucceedActionReducer,
  PrivacyPolicyFailedActionReducer,

  GetLinkActionReducer,
  GetLinkSucceedActionReducer,
  GetLinkFailedActionReducer,
  GetLinkActionResetReducer,

  ChangeContactActionReducer,
  ChangeContactSucceedActionReducer,
  ChangeContactFailedActionReducer,
  ChangeContactActionResetReducer,

  UploadPhotoActionReducer,
  UploadPhotoSucceedActionReducer,
  UploadPhotoFailedActionReducer,
  UploadPhotoActionResetReducer,

  EditKerabatActionReducer,
  EditKerabatSucceedActionReducer,
  EditKerabatFailedActionReducer,
  EditKerabatActionResetReducer,

  GetUserRateActionReducer,
  GetUserRateSucceedActionReducer,
  GetUserRateFailedActionReducer,
  GetUserRateActionResetReducer,

  OcrTokenActionReducer,
  OcrTokenSucceedActionReducer,
  OcrTokenFailedActionReducer,

  OcrKtpActionReducer,
  OcrKtpSucceedActionReducer,
  OcrKtpFailedActionReducer,

  AreaMappingActionReducer,
  AreaMappingFailedActionReducer,
  AreaMappingSucceedActionReducer,

  FaqCategoryActionReducer,
  FaqCategorySucceedActionReducer,
  FaqCategoryFailedActionReducer,

  ToggleBiometricActionReducer,
  ToggleBiometricSucceedActionReducer,
  ToggleBiometricFailedActionReducer,

  ResetAllStateActionReducer,
];
