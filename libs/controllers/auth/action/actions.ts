import {
  CreatePinActionReducer,
  CreatePinActionResetReducer,
} from './commands/create-pin';
import { CreatePinFailedActionReducer } from './events/create-pin-failed';
import { CreatePinSucceedActionReducer } from './events/create-pin-succeed';

import {
  GetNoPesertaActionReducer,
  GetNoPesertaActionResetReducer,
} from './commands/get-no-peserta';
import { GetNoPesertaFailedActionReducer } from './events/get-no-peserta-failed';
import { GetNoPesertaSucceedActionReducer } from './events/get-no-peserta-succeed';

import {
  LogUserActivityActionReducer,
  LogUserActivityActionResetReducer,
} from './commands/log-user-activity';
import { LogUserActivityFailedActionReducer } from './events/log-user-activity-failed';
import { LogUserActivitySucceedActionReducer } from './events/log-user-activity-succeed';

import { LoginActionReducer, LoginActionResetReducer } from './commands/login';
import { LoginFailedActionReducer } from './events/login-failed';
import { LoginSucceedActionReducer } from './events/login-succeed';

import {
  LupaPinActionReducer,
  LupaPinActionResetReducer,
} from './commands/lupa-pin';
import { LupaPinFailedActionReducer } from './events/lupa-pin-failed';
import { LupaPinSucceedActionReducer } from './events/lupa-pin-succeed';

import {
  RequestOtpActionReducer,
  RequestOtpActionResetReducer,
} from './commands/request-otp';
import { RequestOtpFailedActionReducer } from './events/request-otp-failed';
import { RequestOtpSucceedActionReducer } from './events/request-otp-succeed';

import {
  VerifyOtpActionReducer,
  VerifyOtpActionResetReducer,
} from './commands/verify-otp';
import { VerifyOtpFailedActionReducer } from './events/verify-otp-failed';
import { VerifyOtpSucceedActionReducer } from './events/verify-otp-succeed';

import {
  VerifyPinActionReducer,
  VerifyPinActionResetReducer,
} from './commands/verify-pin';
import { VerifyPinFailedActionReducer } from './events/verify-pin-failed';
import { VerifyPinSucceedActionReducer } from './events/verify-pin-succeed';

import {
  VerifyReferralCodeActionReducer,
  VerifyReferralCodeActionResetReducer,
} from './commands/verify-referral-code';
import { VerifyReferralCodeFailedActionReducer } from './events/verify-referral-code-failed';
import { VerifyReferralCodeSucceedActionReducer } from './events/verify-referral-code-succeed';

import {
  GetTokenActionReducer,
  GetTokenActionResetReducer,
} from './commands/get-token';
import { GetTokenFailedActionReducer } from './events/get-token-failed';
import { GetTokenSucceedActionReducer } from './events/get-token-succeed';

import {
  NeedVerificationActionReducer,
  NeedVerificationActionResetReducer,
} from './commands/need-verification';
import { NeedVerificationFailedActionReducer } from './events/need-verification-failed';
import { NeedVerificationSucceedActionReducer } from './events/need-verification-succeed';

import {
  GetTokenByIdProfilActionReducer,
  GetTokenByIdProfilActionResetReducer,
} from './commands/get-token-by-id-profil';
import { GetTokenByIdProfilFailedActionReducer } from './events/get-token-by-id-profil-failed';
import { GetTokenByIdProfilSucceedActionReducer } from './events/get-token-by-id-profil-succeed';
import {
  RefreshTokenActionReducer,
  RefreshTokenActionResetReducer,
} from './commands/refresh-token';
import { RefreshTokenFailedActionReducer } from './events/refresh-token-failed';
import { RefreshTokenSucceedActionReducer } from './events/refresh-token-succed';
import {
  TokenResponseActionReducer,
  TokenResponseActionResetReducer,
} from './commands/token-response';
import { TokenResponseFailedActionReducer } from './events/token-response-failed';
import { TokenResponseSucceedActionReducer } from './events/token-response-succed';
import { ResetAllStateActionReducer } from './states/reset-all-state';
import {
  SaveUserSessionActionReducer,
  SaveUserSessionActionResetReducer,
} from './commands/save-user-session';
import { SaveUserSessionFailedActionReducer } from './events/save-user-session-failed';
import { SaveUserSessionSucceedActionReducer } from './events/save-user-session-succeed';

import {
  DeleteProfilActionReducer,
  DeleteProfilActionResetReducer,
} from './commands/delete-profil';
import { DeleteProfilFailedActionReducer } from './events/delete-profil-failed';
import { DeleteProfilSucceedActionReducer } from './events/delete-profil-succeed';

export const AUTH_ACTION_REDUCERS = [
  CreatePinActionReducer,
  CreatePinSucceedActionReducer,
  CreatePinFailedActionReducer,
  CreatePinActionResetReducer,

  GetNoPesertaActionReducer,
  GetNoPesertaSucceedActionReducer,
  GetNoPesertaFailedActionReducer,
  GetNoPesertaActionResetReducer,

  LogUserActivityActionReducer,
  LogUserActivitySucceedActionReducer,
  LogUserActivityFailedActionReducer,
  LogUserActivityActionResetReducer,

  LoginActionReducer,
  LoginSucceedActionReducer,
  LoginFailedActionReducer,
  LoginActionResetReducer,

  LupaPinActionReducer,
  LupaPinSucceedActionReducer,
  LupaPinFailedActionReducer,
  LupaPinActionResetReducer,

  RequestOtpActionReducer,
  RequestOtpSucceedActionReducer,
  RequestOtpFailedActionReducer,
  RequestOtpActionResetReducer,

  VerifyOtpActionReducer,
  VerifyOtpSucceedActionReducer,
  VerifyOtpFailedActionReducer,
  VerifyOtpActionResetReducer,

  VerifyPinActionReducer,
  VerifyPinSucceedActionReducer,
  VerifyPinFailedActionReducer,
  VerifyPinActionResetReducer,

  VerifyReferralCodeActionReducer,
  VerifyReferralCodeSucceedActionReducer,
  VerifyReferralCodeFailedActionReducer,
  VerifyReferralCodeActionResetReducer,

  GetTokenActionReducer,
  GetTokenSucceedActionReducer,
  GetTokenFailedActionReducer,
  GetTokenActionResetReducer,

  NeedVerificationActionReducer,
  NeedVerificationSucceedActionReducer,
  NeedVerificationFailedActionReducer,
  NeedVerificationActionResetReducer,

  GetTokenByIdProfilActionReducer,
  GetTokenByIdProfilSucceedActionReducer,
  GetTokenByIdProfilFailedActionReducer,
  GetTokenByIdProfilActionResetReducer,

  RefreshTokenActionReducer,
  RefreshTokenActionResetReducer,
  RefreshTokenFailedActionReducer,
  RefreshTokenSucceedActionReducer,

  SaveUserSessionActionReducer,
  SaveUserSessionActionResetReducer,
  SaveUserSessionFailedActionReducer,
  SaveUserSessionSucceedActionReducer,

  TokenResponseActionReducer,
  TokenResponseActionResetReducer,
  TokenResponseFailedActionReducer,
  TokenResponseSucceedActionReducer,

  DeleteProfilActionReducer,
  DeleteProfilSucceedActionReducer,
  DeleteProfilFailedActionReducer,
  DeleteProfilActionResetReducer,

  ResetAllStateActionReducer,
];
