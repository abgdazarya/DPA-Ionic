import { Injectable } from '@angular/core';
import { Store, createSelector, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthState } from '../states/auth.state';
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
import { DataResponse, DataResponseArray } from '@shared';

@Injectable()
export class AuthRepository {
  private _state = (state: any) => state.auth;
  constructor(private store: Store<AuthState>) {}

  // Repo Create Pin
  public getCreatePin$(): Observable<
    DataResponse<CreatePinData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.createPin?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo No Peserta
  public getNoPeserta$(): Observable<
    DataResponseArray<NoPesertaData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.noPeserta?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Sample Data
  public getSample$(): Observable<
    DataResponseArray<Sample> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.sample?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Log User Activity
  public getLogUserActivity$(): Observable<
    DataResponse<LogUserActivityData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.logUserActivity?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Login
  public getLogin$(): Observable<DataResponse<LoginData> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.login?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Lupa Pin
  public getLupaPin$(): Observable<
    DataResponse<LupaPinData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.lupaPin?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Request OTP
  public getRequestOtp$(): Observable<
    DataResponse<RequestOtpData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.requestOtp?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Verify OTP
  public getVerifyOtp$(): Observable<
    DataResponse<VerifyOtpData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.verifyOtp?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Verify Pin
  public getVerifyPin$(): Observable<
    DataResponse<VerifyPinData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.verifyPin?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Verify Referral Code
  public getVerifyReferralCode$(): Observable<
    DataResponse<VerifyReferralCodeData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.verifyReferralCode?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Need Verification
  public getNeedVerification$(): Observable<
    DataResponse<NeedVerificationData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.needVerification?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Delete Profil
  public getDeleteProfil$(): Observable<
    DataResponse<DeleteProfilModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.deleteProfil?.main
    );
    return this.store.pipe(select(selector));
  }

  public refreshToken$(): Observable<
    DataResponse<LoginData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.refreshToken?.main
    );
    return this.store.pipe(select(selector));
  }

  public tokenResponse$(): Observable<
    DataResponse<LoginData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: AuthState) => state?.tokenResponse?.main
    );
    return this.store.pipe(select(selector));
  }
}
