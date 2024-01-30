import { Injectable } from '@angular/core';
import {
  EditKerabatData,
  LinkData,
  ToggleBiometricData,
  UploadPhotoData,
} from '@controllers/profile';
import { createSelector, select, Store } from '@ngrx/store';
import {
  DataResponse,
  DataResponseArray,
  DataResponsePagination,
} from '@shared';
import { ChangeContactData } from 'libs/controllers/profile/models/change-contact';
import { FaqData } from 'libs/controllers/profile/models/faq';
import { KartuPesertaData } from 'libs/controllers/profile/models/kartu-peserta';
import { NotificationData } from 'libs/controllers/profile/models/notification';
import { PrivacyData } from 'libs/controllers/profile/models/privacy';
import {
  BaseProfile,
  DetailProfile,
} from 'libs/controllers/profile/models/profile';
import { RateData, UserRateData } from 'libs/controllers/profile/models/rate';
import { ReadNotification } from 'libs/controllers/profile/models/read-notification';
import { ToggleEmailData } from 'libs/controllers/profile/models/toggle-email';
import { ToggleNotificationData } from 'libs/controllers/profile/models/toggle-notification';
import { Observable } from 'rxjs';
import { ProfileState } from '../states/profile.state';
import { OCRTokenData } from 'libs/controllers/profile/models/ocr-token.model';
import { OCRData } from 'libs/controllers/profile/models/ocr.model';
import { AreaMappingData } from 'libs/controllers/profile/models/area-mapping.model';
import { FaqCategoryData } from 'libs/controllers/profile/models/faq-category';

@Injectable({ providedIn: 'root' })
export class ProfileRepository {
  private _state = (state: any) => state.profile;
  constructor(private store: Store<ProfileState>) {}

  // Example select data from store
  // Code below

  public getUserInfoData$(): Observable<BaseProfile | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.userInfo?.data
    );
    return this.store.pipe(select(selector));
  }

  public getUserDetailData$(): Observable<DetailProfile | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.userDetail?.data
    );
    return this.store.pipe(select(selector));
  }

  public getKartuPesertaData$(): Observable<
    KartuPesertaData | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.kartuPeserta?.data
    );
    return this.store.pipe(select(selector));
  }

  public getNotificationHeader$(): Observable<
    DataResponsePagination<NotificationData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.notification?.header
    );
    return this.store.pipe(select(selector));
  }

  public getNotificationList$(): Observable<
    DataResponsePagination<NotificationData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.notification?.list
    );
    return this.store.pipe(select(selector));
  }

  public getFaqData$(): Observable<FaqData[] | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.faq?.data
    );
    return this.store.pipe(select(selector));
  }

  public postEditProfilData$(): Observable<
    DataResponse<DetailProfile> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.editProfile.main
    );
    return this.store.pipe(select(selector));
  }

  public setNotificationData$(): Observable<
    ReadNotification | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.readNotification?.data
    );
    return this.store.pipe(select(selector));
  }

  public toggleNotificationData$(): Observable<
    ToggleNotificationData | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.toggleNotification?.data
    );
    return this.store.pipe(select(selector));
  }

  public toggleEmailGoogleData$(): Observable<
    ToggleEmailData | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.toggleEmail?.google
    );
    return this.store.pipe(select(selector));
  }

  public toggleEmailAppleData$(): Observable<
    ToggleEmailData | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.toggleEmail?.apple
    );
    return this.store.pipe(select(selector));
  }

  public rateReviewData$(): Observable<RateData | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.rateReview?.data
    );
    return this.store.pipe(select(selector));
  }

  public privacyPolicyData$(): Observable<PrivacyData[] | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.privacyPolicy?.data
    );
    return this.store.pipe(select(selector));
  }

  public getLink$(): Observable<DataResponse<LinkData> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.link?.main
    );
    return this.store.pipe(select(selector));
  }

  public changeContact$(): Observable<
    DataResponse<ChangeContactData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.changeContact?.main
    );
    return this.store.pipe(select(selector));
  }

  public uploadPhoto$(): Observable<
    DataResponse<UploadPhotoData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.photo?.main
    );
    return this.store.pipe(select(selector));
  }

  public editKerabat$(): Observable<
    DataResponse<EditKerabatData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.editKerabat?.main
    );
    return this.store.pipe(select(selector));
  }

  public getUserRate$(): Observable<
    DataResponse<UserRateData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.userRate?.main
    );
    return this.store.pipe(select(selector));
  }

  public getOcrToken$(): Observable<OCRTokenData | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.ocrToken
    );
    return this.store.pipe(select(selector));
  }

  public ocrUploadKtp$(): Observable<DataResponse<OCRData> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.ocrKtp
    );
    return this.store.pipe(select(selector));
  }

  public areaMapping$(
    key: string
  ): Observable<DataResponseArray<AreaMappingData> | undefined | null> {
    const selector = createSelector(this._state, (state: ProfileState) => {
      return state?.areaMapping?.[key];
    });
    return this.store.pipe(select(selector));
  }

  public faqCategory$(): Observable<
    DataResponseArray<FaqCategoryData> | undefined | null
  > {
    const selector = createSelector(this._state, (state: ProfileState) => {
      return state?.faqCategory;
    });
    return this.store.pipe(select(selector));
  }

  public toggleBiometricData$(): Observable<
    ToggleBiometricData | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: ProfileState) => state?.toggleBiometric?.data
    );
    return this.store.pipe(select(selector));
  }
}
