import { Injectable } from '@angular/core';
import { Store, createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthInteractionState } from '../states/auth.interaction.state';
import { InteractionState } from '@shared';

@Injectable()
export class AuthInteractionRepository {
  private _state = (state: any) => state.authInteraction;
  constructor(private store: Store<AuthInteractionState>) {}

  // Repo Create Pin Interaction
  public getCreatePinInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.createPin?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo No Peserta Interaction
  public getNoPesertaInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.noPeserta?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Sample Interaction
  public getSampleInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.sample?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Log User Activity Interaction
  public getLogUserActivityInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.logUserActivity?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Login Interaction
  public getLoginInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.login?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Lupa Pin Interaction
  public getLupaPinInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.lupaPin?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Request OTP Interaction
  public getRequestOtpInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.requestOtp?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Verify OTP Interaction
  public getVerifyOtpInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.verifyOtp?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Verify Pin Interaction
  public getVerifyPinInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.verifyPin?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Verify Referral Code Interaction
  public getVerifyReferralCodeInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.verifyReferralCode?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Need Verification Interaction
  public getNeedVerificationInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.needVerification?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Delete Profil Interaction
  public getDeleteProfilInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.deleteProfil?.main
    );
    return this.store.pipe(select(selector));
  }

  public refreshTokenInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.refreshToken?.main
    );
    return this.store.pipe(select(selector));
  }

  public tokenResponseInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: AuthInteractionState) => state?.tokenResponse?.main
    );
    return this.store.pipe(select(selector));
  }
}
