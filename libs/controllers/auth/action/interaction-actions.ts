import {
  CreatePinInteractionActionReducer,
  CreatePinInteractionActionResetReducer,
} from './commands/create-pin';
import { CreatePinFailedInteractionActionReducer } from './events/create-pin-failed';
import { CreatePinSucceedInteractionActionReducer } from './events/create-pin-succeed';

import {
  GetNoPesertaInteractionActionReducer,
  GetNoPesertaInteractionActionResetReducer,
} from './commands/get-no-peserta';
import { GetNoPesertaFailedInteractionActionReducer } from './events/get-no-peserta-failed';
import { GetNoPesertaSucceedInteractionActionReducer } from './events/get-no-peserta-succeed';

import {
  LogUserActivityInteractionActionReducer,
  LogUserActivityInteractionActionResetReducer,
} from './commands/log-user-activity';
import { LogUserActivityFailedInteractionActionReducer } from './events/log-user-activity-failed';
import { LogUserActivitySucceedInteractionActionReducer } from './events/log-user-activity-succeed';

import {
  LoginInteractionActionResetReducer,
  LoginInteractionActionReducer,
} from './commands/login';
import { LoginFailedInteractionActionReducer } from './events/login-failed';
import { LoginSucceedInteractionActionReducer } from './events/login-succeed';

import {
  LupaPinInteractionActionReducer,
  LupaPinInteractionActionResetReducer,
} from './commands/lupa-pin';
import { LupaPinFailedInteractionActionReducer } from './events/lupa-pin-failed';
import { LupaPinSucceedInteractionActionReducer } from './events/lupa-pin-succeed';

import {
  RequestOtpInteractionActionReducer,
  RequestOtpInteractionActionResetReducer,
} from './commands/request-otp';
import { RequestOtpFailedInteractionActionReducer } from './events/request-otp-failed';
import { RequestOtpSucceedInteractionActionReducer } from './events/request-otp-succeed';

import {
  VerifyOtpInteractionActionReducer,
  VerifyOtpInteractionActionResetReducer,
} from './commands/verify-otp';
import { VerifyOtpFailedInteractionActionReducer } from './events/verify-otp-failed';
import { VerifyOtpSucceedInteractionActionReducer } from './events/verify-otp-succeed';

import {
  VerifyPinInteractionActionReducer,
  VerifyPinInteractionActionResetReducer,
} from './commands/verify-pin';
import { VerifyPinFailedInteractionActionReducer } from './events/verify-pin-failed';
import { VerifyPinSucceedInteractionActionReducer } from './events/verify-pin-succeed';

import {
  VerifyReferralCodeInteractionActionReducer,
  VerifyReferralCodeInteractionActionResetReducer,
} from './commands/verify-referral-code';
import { VerifyReferralCodeFailedInteractionActionReducer } from './events/verify-referral-code-failed';
import { VerifyReferralCodeSucceedInteractionActionReducer } from './events/verify-referral-code-succeed';

import {
  GetTokenInteractionActionReducer,
  GetTokenInteractionActionResetReducer,
} from './commands/get-token';
import { GetTokenFailedInteractionActionReducer } from './events/get-token-failed';
import { GetTokenSucceedInteractionActionReducer } from './events/get-token-succeed';

import {
  NeedVerificationInteractionActionReducer,
  NeedVerificationInteractionActionResetReducer,
} from './commands/need-verification';
import { NeedVerificationFailedInteractionActionReducer } from './events/need-verification-failed';
import { NeedVerificationSucceedInteractionActionReducer } from './events/need-verification-succeed';

import {
  GetTokenByIdProfilInteractionActionReducer,
  GetTokenByIdProfilInteractionActionResetReducer,
} from './commands/get-token-by-id-profil';
import { GetTokenByIdProfilFailedInteractionActionReducer } from './events/get-token-by-id-profil-failed';
import { GetTokenByIdProfilSucceedInteractionActionReducer } from './events/get-token-by-id-profil-succeed';
import {
  RefreshTokenInteractionActionReducer,
  RefreshTokenInteractionActionResetReducer,
} from './commands/refresh-token';
import { RefreshTokenFailedInteractionActionReducer } from './events/refresh-token-failed';
import { RefreshTokenSucceedInteractionActionReducer } from './events/refresh-token-succed';
import {
  TokenResponseInteractionActionReducer,
  TokenResponseInteractionActionResetReducer,
} from './commands/token-response';
import { TokenResponseFailedInteractionActionReducer } from './events/token-response-failed';
import { TokenResponseSucceedInteractionActionReducer } from './events/token-response-succed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';
import {
  SaveUserSessionInteractionActionReducer,
  SaveUserSessionInteractionActionResetReducer,
} from './commands/save-user-session';
import { SaveUserSessionFailedInteractionActionReducer } from './events/save-user-session-failed';
import { SaveUserSessionSucceedInteractionActionReducer } from './events/save-user-session-succeed';

import {
  DeleteProfilInteractionActionReducer,
  DeleteProfilInteractionActionResetReducer,
} from './commands/delete-profil';
import { DeleteProfilFailedInteractionActionReducer } from './events/delete-profil-failed';
import { DeleteProfilSucceedInteractionActionReducer } from './events/delete-profil-succeed';

export const AUTH_INTERACTION_ACTION_REDUCERS = [
  CreatePinInteractionActionReducer,
  CreatePinSucceedInteractionActionReducer,
  CreatePinFailedInteractionActionReducer,
  CreatePinInteractionActionResetReducer,

  GetNoPesertaInteractionActionReducer,
  GetNoPesertaSucceedInteractionActionReducer,
  GetNoPesertaFailedInteractionActionReducer,
  GetNoPesertaInteractionActionResetReducer,

  LogUserActivityInteractionActionReducer,
  LogUserActivitySucceedInteractionActionReducer,
  LogUserActivityFailedInteractionActionReducer,
  LogUserActivityInteractionActionResetReducer,

  LoginInteractionActionReducer,
  LoginSucceedInteractionActionReducer,
  LoginFailedInteractionActionReducer,
  LoginInteractionActionResetReducer,

  LupaPinInteractionActionReducer,
  LupaPinSucceedInteractionActionReducer,
  LupaPinFailedInteractionActionReducer,
  LupaPinInteractionActionResetReducer,

  RequestOtpInteractionActionReducer,
  RequestOtpSucceedInteractionActionReducer,
  RequestOtpFailedInteractionActionReducer,
  RequestOtpInteractionActionResetReducer,

  VerifyOtpInteractionActionReducer,
  VerifyOtpSucceedInteractionActionReducer,
  VerifyOtpFailedInteractionActionReducer,
  VerifyOtpInteractionActionResetReducer,

  VerifyPinInteractionActionReducer,
  VerifyPinSucceedInteractionActionReducer,
  VerifyPinFailedInteractionActionReducer,
  VerifyPinInteractionActionResetReducer,

  VerifyReferralCodeInteractionActionReducer,
  VerifyReferralCodeSucceedInteractionActionReducer,
  VerifyReferralCodeFailedInteractionActionReducer,
  VerifyReferralCodeInteractionActionResetReducer,

  GetTokenInteractionActionReducer,
  GetTokenSucceedInteractionActionReducer,
  GetTokenFailedInteractionActionReducer,
  GetTokenInteractionActionResetReducer,

  NeedVerificationInteractionActionReducer,
  NeedVerificationSucceedInteractionActionReducer,
  NeedVerificationFailedInteractionActionReducer,
  NeedVerificationInteractionActionResetReducer,

  GetTokenByIdProfilInteractionActionReducer,
  GetTokenByIdProfilSucceedInteractionActionReducer,
  GetTokenByIdProfilFailedInteractionActionReducer,
  GetTokenByIdProfilInteractionActionResetReducer,

  RefreshTokenInteractionActionReducer,
  RefreshTokenInteractionActionResetReducer,
  RefreshTokenFailedInteractionActionReducer,
  RefreshTokenSucceedInteractionActionReducer,

  SaveUserSessionInteractionActionReducer,
  SaveUserSessionInteractionActionResetReducer,
  SaveUserSessionFailedInteractionActionReducer,
  SaveUserSessionSucceedInteractionActionReducer,

  TokenResponseInteractionActionReducer,
  TokenResponseInteractionActionResetReducer,
  TokenResponseFailedInteractionActionReducer,
  TokenResponseSucceedInteractionActionReducer,

  DeleteProfilInteractionActionReducer,
  DeleteProfilSucceedInteractionActionReducer,
  DeleteProfilFailedInteractionActionReducer,
  DeleteProfilInteractionActionResetReducer,

  ResetAllStateInteractionActionReducer,
];
