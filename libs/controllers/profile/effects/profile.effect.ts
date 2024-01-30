import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { combineLatest, concat, from, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AreaMapping } from '../action/command/area-mapping';
import { ChangeContact } from '../action/command/change-contact';
import { EditKerabat } from '../action/command/edit-kerabat';
import { EditProfile } from '../action/command/edit-profile';
import { Faq } from '../action/command/faq';
import { FaqCategory } from '../action/command/faq-category';
import { GetLink } from '../action/command/get-link';
import { GetUserRate } from '../action/command/get-user-rate';
import { KartuPeserta } from '../action/command/kartu-peserta';
import { Notification } from '../action/command/notifications';
import { OcrKtp } from '../action/command/ocr-ktp';
import { OcrToken } from '../action/command/ocr-token';
import { PrivacyPolicy } from '../action/command/privacy-policy';
import { RateReview } from '../action/command/rate-review';
import { SetNotification } from '../action/command/set-notification';
import { SetTokenFcm } from '../action/command/set-token-fcm';
import { ToggleBiometric } from '../action/command/toggle-biometric';
import { ToggleEmail } from '../action/command/toggle-email';
import { ToggleNotification } from '../action/command/toggle-notification';
import { UploadPhoto } from '../action/command/upload-photo';
import { UserDetail } from '../action/command/user-detail';
import { UserInfo } from '../action/command/user-profile';
import { AreaMappingFailed } from '../action/events/area-mapping-failed';
import { AreaMappingSucceed } from '../action/events/area-mapping-succeed';
import { ChangeContactFailed } from '../action/events/change-contact-failed';
import { ChangeContactSucceed } from '../action/events/change-contact-succeed';
import { EditKerabatFailed } from '../action/events/edit-kerabat-failed';
import { EditKerabatSucceed } from '../action/events/edit-kerabat-succeed';
import { EditProfileFailed } from '../action/events/edit-profile-failed';
import { EditProfileSucceed } from '../action/events/edit-profile-succeed';
import { FaqCategoryFailed } from '../action/events/faq-category-failed';
import { FaqCategorySucceed } from '../action/events/faq-category-succeed';
import { FaqFailed } from '../action/events/faq-failed';
import { FaqSucceed } from '../action/events/faq-succeed';
import { GetLinkFailed } from '../action/events/get-link-failed';
import { GetLinkSucceed } from '../action/events/get-link-succeed';
import { GetUserRateFailed } from '../action/events/get-user-rate-failed';
import { GetUserRateSucceed } from '../action/events/get-user-rate-succeed';
import { KartuPesertaFailed } from '../action/events/kartu-peserta-failed';
import { KartuPesertaSucceed } from '../action/events/kartu-peserta-succeed';
import { NotificationFailed } from '../action/events/notification-failed';
import { NotificationSucceed } from '../action/events/notification-succeed';
import { OcrKtpFailed } from '../action/events/ocr-ktp-failed';
import { OcrKtpSucceed } from '../action/events/ocr-ktp-succeed';
import { OcrTokenFailed } from '../action/events/ocr-token-failed';
import { OcrTokenSucceed } from '../action/events/ocr-token-succeed';
import { PrivacyPolicyFailed } from '../action/events/privacy-policy-failed';
import { PrivacyPolicySucceed } from '../action/events/privacy-policy-succeed';
import { RateReviewFailed } from '../action/events/rate-review-failed';
import { RateReviewSucceed } from '../action/events/rate-review-succeed';
import { SetNotificationFailed } from '../action/events/set-notification-failed';
import { SetNotificationSucceed } from '../action/events/set-notification-succeed';
import { SetTokenFcmFailed } from '../action/events/set-token-fcm-failed';
import { SetTokenFcmSucceed } from '../action/events/set-token-fcm-succeed';
import { ToggleBiometricFailed } from '../action/events/toggle-biometric-failed';
import { ToggleBiometricSucceed } from '../action/events/toggle-biometric-succeed';
import { ToggleEmailFailed } from '../action/events/toggle-email-failed';
import { ToggleEmailSucceed } from '../action/events/toggle-email-succeed';
import { ToggleNotificationFailed } from '../action/events/toggle-notification-failed';
import { ToggleNotificationSucceed } from '../action/events/toggle-notification-succeed';
import { UploadPhotoFailed } from '../action/events/upload-photo-failed';
import { UploadPhotoSucceed } from '../action/events/upload-photo-succeed';
import { UserDetailFailed } from '../action/events/user-detail-failed';
import { UserDetailSucceed } from '../action/events/user-detail-succeed';
import { UserInfoFailed } from '../action/events/user-info-failed';
import { UserInfoSucceed } from '../action/events/user-info-succeed';
import { ProfileMasterService } from '../services/profile-master.service';
import { ProfileService } from '../services/profile.service';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable({ providedIn: 'root' })
export class ProfileEffect {
  constructor(
    private actions$: Actions,
    private service: ProfileService,
    private serviceMaster: ProfileMasterService,
    private storageService: StorageService
  ) {}

  userInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserInfo),
      mergeMap(({ async, payload }) =>
        this.service.userInfo(payload).pipe(
          mergeMap(async (response) => {
            const noPeserta = await this.storageService.getStorage(
              StorageKeyEnum.NOMOR_PESERTA
            );

            if (noPeserta) {
              const finded = response.data?.noPeserta?.find(
                (val) => val.idAccount === noPeserta?.idAccount
              );

              if (finded) {
                const newNoPeserta = {
                  ...noPeserta,
                  statusPeserta: finded.statusPeserta,
                };

                await this.storageService.setStorage(
                  StorageKeyEnum.NOMOR_PESERTA,
                  newNoPeserta
                );
              }
            }

            return UserInfoSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: { ...error, form: 'userInfo' },
                }),
                UserInfoFailed({ response: error, clearData: false }),
              ]);
            }

            if (error?.code == '12') {
              // this.storageService.clearStorage();
              return concat([
                TokenResponseFailed({
                  response: { ...error, form: 'userInfo' },
                }),
                UserInfoFailed({ response: error, clearData: true }),
              ]);
            }

            return of(UserInfoFailed({ response: error }));
          })
        )
      )
    )
  );

  userDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetail),
      mergeMap(({ async, payload }) =>
        this.service.userDetail(payload).pipe(
          map((response) => {
            this.storageService.setStorage(
              StorageKeyEnum.DETAIL_PROFILE,
              response.data
            );
            return UserDetailSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                UserDetailFailed({
                  response: error,
                }),
              ]);
            }
            return of(UserDetailFailed({ response: error }));
          })
        )
      )
    )
  );

  kartuPeserta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KartuPeserta),
      mergeMap(({ async, payload }) =>
        this.service.kartuPeserta(payload).pipe(
          map((response) => KartuPesertaSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                KartuPesertaFailed({
                  response: error,
                }),
              ]);
            }
            return of(KartuPesertaFailed({ response: error }));
          })
        )
      )
    )
  );

  notification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Notification),
      mergeMap(({ async, payload, dataType, append }) =>
        this.service.notification(payload).pipe(
          map((response) =>
            NotificationSucceed({ response, dataType, append })
          ),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                NotificationFailed({ response: error, dataType }),
              ]);
            }
            return of(NotificationFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  editProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditProfile),
      mergeMap(({ async, payload }) =>
        this.service.editProfil(payload).pipe(
          map((response) => EditProfileSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                EditProfileFailed({ response: error }),
              ]);
            }
            return of(EditProfileFailed({ response: error }));
          })
        )
      )
    )
  );

  faq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Faq),
      mergeMap(({ async, payload }) =>
        this.service.faq(payload).pipe(
          map((response) => FaqSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                FaqFailed({ response: error }),
              ]);
            }
            return of(FaqFailed({ response: error }));
          })
        )
      )
    )
  );

  readNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetNotification),
      mergeMap(({ async, payload }) =>
        this.service.setReadNotification(payload).pipe(
          map((response) => SetNotificationSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                SetNotificationFailed({ response: error }),
              ]);
            }
            return of(SetNotificationFailed({ response: error }));
          })
        )
      )
    )
  );

  setTokenFcm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetTokenFcm),
      mergeMap(({ async, payload }) =>
        this.service.setTokenFcm(payload).pipe(
          map((response) => SetTokenFcmSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                SetTokenFcmFailed({ response: error }),
              ]);
            }
            return of(SetTokenFcmFailed({ response: error }));
          })
        )
      )
    )
  );

  toggleNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToggleNotification),
      mergeMap(({ async, payload }) =>
        this.service.toggleNotification(payload).pipe(
          map((response) => ToggleNotificationSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ToggleNotificationFailed({ response: error }),
              ]);
            }
            return of(ToggleNotificationFailed({ response: error }));
          })
        )
      )
    )
  );

  toggleEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToggleEmail),
      mergeMap(({ async, payload, toggleType }) =>
        this.service.toggleEmail(payload).pipe(
          map((response) => {
            return ToggleEmailSucceed({ response, toggleType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ToggleEmailFailed({ response: error, toggleType }),
              ]);
            }
            return of(ToggleEmailFailed({ response: error, toggleType }));
          })
        )
      )
    )
  );

  rateReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RateReview),
      mergeMap(({ async, payload }) =>
        this.service.setRateReview(payload).pipe(
          map((response) => RateReviewSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                RateReviewFailed({ response: error }),
              ]);
            }
            return of(RateReviewFailed({ response: error }));
          })
        )
      )
    )
  );

  privacyPolicy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrivacyPolicy),
      mergeMap(({ async }) =>
        this.service.privacyPolicy().pipe(
          map((response) => PrivacyPolicySucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                PrivacyPolicyFailed({ response: error }),
              ]);
            }
            return of(PrivacyPolicyFailed({ response: error }));
          })
        )
      )
    )
  );

  getLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetLink),
      mergeMap(({ async, payload }) => {
        return this.service.getLink(payload).pipe(
          map((response) => {
            return GetLinkSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetLinkFailed({ response: error }),
              ]);
            }

            return of(GetLinkFailed({ response: error }));
          })
        );
      })
    )
  );

  changeContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeContact),
      mergeMap(({ async, payload }) =>
        this.service.changeContact(payload).pipe(
          map((response) => {
            return ChangeContactSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ChangeContactFailed({ response: error }),
              ]);
            }
            return of(ChangeContactFailed({ response: error }));
          })
        )
      )
    )
  );

  uploadPhoto = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadPhoto),
      mergeMap(({ async, payload }) =>
        this.service.uploadPhoto(payload).pipe(
          map((response) => {
            return UploadPhotoSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                UploadPhotoFailed({ response: error }),
              ]);
            }
            return of(UploadPhotoFailed({ response: error }));
          })
        )
      )
    )
  );

  editKerabat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditKerabat),
      mergeMap(({ async, payload }) =>
        this.service.editKerabat(payload).pipe(
          map((response) => {
            return EditKerabatSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                EditKerabatFailed({ response: error }),
              ]);
            }
            return of(EditKerabatFailed({ response: error }));
          })
        )
      )
    )
  );

  getUserRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUserRate),
      mergeMap(({ async, payload }) =>
        this.service.getRating(payload).pipe(
          map((response) => {
            return GetUserRateSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetUserRateFailed({ response: error }),
              ]);
            }
            return of(GetUserRateFailed({ response: error }));
          })
        )
      )
    )
  );

  getOcrToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OcrToken),
      mergeMap(({ async, payload }) =>
        this.service.generateOcrToken(payload).pipe(
          map((response) => {
            return OcrTokenSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                OcrTokenFailed({ response: error }),
              ]);
            }
            return of(OcrTokenFailed({ response: error }));
          })
        )
      )
    )
  );

  ocrUploadKtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OcrKtp),
      mergeMap(({ async, payload }) =>
        this.service.ocrKTPUpload(payload).pipe(
          map((response) => {
            return OcrKtpSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                OcrKtpFailed({ response: error }),
              ]);
            }
            return of(OcrKtpFailed({ response: error }));
          })
        )
      )
    )
  );

  areaMapping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreaMapping),
      mergeMap(({ async, payload }) =>
        this.serviceMaster.getAreaMapping(payload).pipe(
          map((response) => {
            return AreaMappingSucceed({ response, key: payload.key });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                AreaMappingFailed({ response: error, key: payload.key }),
              ]);
            }
            return of(AreaMappingFailed({ response: error, key: payload.key }));
          })
        )
      )
    )
  );

  faqCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaqCategory),
      mergeMap(({ params, async }) =>
        this.service.faqCategory(params).pipe(
          map((response) => FaqCategorySucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                FaqCategoryFailed({ response: error }),
              ]);
            }
            return of(FaqCategoryFailed({ response: error }));
          })
        )
      )
    )
  );

  toggleBiometric$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToggleBiometric),
      mergeMap(({ async, payload }) =>
        this.service.toggleBiometric(payload).pipe(
          map((response) => ToggleBiometricSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ToggleBiometricFailed({ response: error }),
              ]);
            }
            return of(ToggleBiometricFailed({ response: error }));
          })
        )
      )
    )
  );
}
