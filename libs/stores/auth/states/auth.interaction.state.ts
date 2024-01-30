import { InteractionState, INITIAL_INTERACTION_STATE } from '@shared';

interface AuthInteractionCreatePinState {
  main: InteractionState;
}

interface AuthInteractionLoginState {
  main: InteractionState;
}

interface AuthInteractionNoPesertaState {
  main: InteractionState;
}

interface AuthInteractionLogUserActivityState {
  main: InteractionState;
}

interface AuthInteractionLupaPinState {
  main: InteractionState;
}

interface AuthInteractionRequestOtpState {
  main: InteractionState;
}

interface AuthInteractionVerifyOtpState {
  main: InteractionState;
}

interface AuthInteractionVerifyPinState {
  main: InteractionState;
}

interface AuthInteractionVerifyReferralCodeState {
  main: InteractionState;
}

interface AuthInteractionSampleState {
  main: InteractionState;
}

interface AuthInteractionNeedVerificationState {
  main: InteractionState;
}

interface AuthInteractionDeleteProfilState {
  main: InteractionState;
}

export interface AuthInteractionState {
  sample: AuthInteractionSampleState;
  createPin: AuthInteractionCreatePinState;
  noPeserta: AuthInteractionNoPesertaState;
  logUserActivity: AuthInteractionLogUserActivityState;
  login: AuthInteractionLoginState;
  lupaPin: AuthInteractionLupaPinState;
  requestOtp: AuthInteractionRequestOtpState;
  verifyOtp: AuthInteractionVerifyOtpState;
  verifyPin: AuthInteractionVerifyPinState;
  verifyReferralCode: AuthInteractionVerifyReferralCodeState;
  needVerification: AuthInteractionNeedVerificationState;
  refreshToken: AuthInteractionLoginState;
  tokenResponse: AuthInteractionLoginState;
  deleteProfil: AuthInteractionDeleteProfilState;
}

export const AUTH_INITIAL_INTERACTION_STATE: AuthInteractionState = {
  sample: { main: INITIAL_INTERACTION_STATE },
  createPin: { main: INITIAL_INTERACTION_STATE },
  noPeserta: { main: INITIAL_INTERACTION_STATE },
  logUserActivity: { main: INITIAL_INTERACTION_STATE },
  login: { main: INITIAL_INTERACTION_STATE },
  lupaPin: { main: INITIAL_INTERACTION_STATE },
  requestOtp: { main: INITIAL_INTERACTION_STATE },
  verifyOtp: { main: INITIAL_INTERACTION_STATE },
  verifyPin: { main: INITIAL_INTERACTION_STATE },
  verifyReferralCode: { main: INITIAL_INTERACTION_STATE },
  needVerification: { main: INITIAL_INTERACTION_STATE },
  refreshToken: { main: INITIAL_INTERACTION_STATE },
  tokenResponse: { main: INITIAL_INTERACTION_STATE },
  deleteProfil: { main: INITIAL_INTERACTION_STATE },
};
