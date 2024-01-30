import { Injectable } from '@angular/core';
import { Store, createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProfileInteractionState } from '../states/profile.interaction.state';
import { InteractionState } from '@shared';

@Injectable({ providedIn: 'root' })
export class ProfileInteractionRepository {
  private _state = (state: any) => state.profileInteraction;
  constructor(private store: Store<ProfileInteractionState>) {}

  // Example select data from store
  // Code below

  public getUserInfoInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.userInfo
    );
    return this.store.pipe(select(selector));
  }

  public getUserDetailInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.userDetail
    );
    return this.store.pipe(select(selector));
  }

  public getKartuPesertaInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.kartuPeserta
    );
    return this.store.pipe(select(selector));
  }

  public getNotificationHeaderInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.notification?.header
    );
    return this.store.pipe(select(selector));
  }

  public getNotificationListInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.notification?.list
    );
    return this.store.pipe(select(selector));
  }

  public getFaqInteraction$(): Observable<InteractionState | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.faq
    );
    return this.store.pipe(select(selector));
  }

  public postEditProfileInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.editProfile.main
    );
    return this.store.pipe(select(selector));
  }

  public setNotificationInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.readNotification
    );
    return this.store.pipe(select(selector));
  }

  public toggleNotificationInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.toggleNotification
    );
    return this.store.pipe(select(selector));
  }

  public toggleEmailGoogleInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.toggleEmail?.google
    );
    return this.store.pipe(select(selector));
  }

  public toggleEmailAppleInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.toggleEmail?.apple
    );
    return this.store.pipe(select(selector));
  }

  public rateReviewInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.rateReview
    );
    return this.store.pipe(select(selector));
  }

  public privacyPolicyInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.privacyPolicy
    );
    return this.store.pipe(select(selector));
  }

  // Repo Link Interaction
  public getLinkInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.link?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Change Contact Interaction
  public changeContactInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.changeContact?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Upload Photo Interaction
  public uploadPhotoInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.photo?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Kerabat Data Interaction
  public editKerabatInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.editKerabat?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo User Rating Interaction
  public getUserRateInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.userRate?.main
    );
    return this.store.pipe(select(selector));
  }

  public getOcrTokenInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.ocrToken
    );
    return this.store.pipe(select(selector));
  }

  public ocrUploadKtpInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.ocrKtp
    );
    return this.store.pipe(select(selector));
  }

  public areaMappingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.areaMapping
    );
    return this.store.pipe(select(selector));
  }

  public faqCategoryInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.faqCategory
    );
    return this.store.pipe(select(selector));
  }

  public toggleBiometricInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileInteractionState) => state?.toggleBiometric
    );
    return this.store.pipe(select(selector));
  }
}
