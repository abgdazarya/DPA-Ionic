import {
  CreatePinData,
  DeleteProfilModel,
  LogUserActivityData,
  LoginData,
  LupaPinData,
  NeedVerificationData,
  NoPesertaData,
  RequestOtpData,
  Sample,
  VerifyOtpData,
  VerifyPinData,
  VerifyReferralCodeData,
} from '@controllers/auth';
import {
  DataResponse,
  DATA_RESPONSE_INITIAL_STATE,
  DataResponseArray,
} from '@shared';

interface AuthCreatePinState {
  main: DataResponse<CreatePinData> | undefined | null;
}

interface AuthLoginState {
  main: DataResponse<LoginData> | undefined | null;
}

interface AuthNoPesertaState {
  main: DataResponseArray<NoPesertaData> | undefined | null;
}

interface AuthLogUserActivityState {
  main: DataResponse<LogUserActivityData> | undefined | null;
}

interface AuthLupaPinState {
  main: DataResponse<LupaPinData> | undefined | null;
}

interface AuthRequestOtpState {
  main: DataResponse<RequestOtpData> | undefined | null;
}

interface AuthVerifyOtpState {
  main: DataResponse<VerifyOtpData> | undefined | null;
}

interface AuthVerifyPinState {
  main: DataResponse<VerifyPinData> | undefined | null;
}

interface AuthVerifyReferralCodeState {
  main: DataResponse<VerifyReferralCodeData> | undefined | null;
}

interface AuthSampleState {
  main: DataResponseArray<Sample> | undefined | null;
}

interface AuthNeedVerificationState {
  main: DataResponse<LoginData> | undefined | null;
}

interface AuthDeleteProfilState {
  main: DataResponse<DeleteProfilModel> | undefined | null;
}

export interface AuthState {
  sample: AuthSampleState;
  createPin: AuthCreatePinState;
  noPeserta: AuthNoPesertaState;
  logUserActivity: AuthLogUserActivityState;
  login: AuthLoginState;
  lupaPin: AuthLupaPinState;
  requestOtp: AuthRequestOtpState;
  verifyOtp: AuthVerifyOtpState;
  verifyPin: AuthVerifyPinState;
  verifyReferralCode: AuthVerifyReferralCodeState;
  needVerification: AuthNeedVerificationState;
  refreshToken: AuthLoginState;
  tokenResponse: AuthLoginState;
  deleteProfil: AuthDeleteProfilState;
}

export const AUTH_INITIAL_STATE: AuthState = {
  sample: { main: DATA_RESPONSE_INITIAL_STATE },
  createPin: { main: DATA_RESPONSE_INITIAL_STATE },
  noPeserta: { main: DATA_RESPONSE_INITIAL_STATE },
  logUserActivity: { main: DATA_RESPONSE_INITIAL_STATE },
  login: { main: DATA_RESPONSE_INITIAL_STATE },
  lupaPin: { main: DATA_RESPONSE_INITIAL_STATE },
  requestOtp: { main: DATA_RESPONSE_INITIAL_STATE },
  verifyOtp: { main: DATA_RESPONSE_INITIAL_STATE },
  verifyPin: { main: DATA_RESPONSE_INITIAL_STATE },
  verifyReferralCode: { main: DATA_RESPONSE_INITIAL_STATE },
  needVerification: { main: DATA_RESPONSE_INITIAL_STATE },
  refreshToken: { main: DATA_RESPONSE_INITIAL_STATE },
  tokenResponse: { main: DATA_RESPONSE_INITIAL_STATE },
  deleteProfil: { main: DATA_RESPONSE_INITIAL_STATE },
};
