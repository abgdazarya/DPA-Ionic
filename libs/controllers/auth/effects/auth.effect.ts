import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CreatePin } from '../action/commands/create-pin';
import { GetNoPeserta } from '../action/commands/get-no-peserta';
import { LogUserActivity } from '../action/commands/log-user-activity';
import { Login } from '../action/commands/login';
import { LupaPin } from '../action/commands/lupa-pin';
import { RequestOtp } from '../action/commands/request-otp';
import { VerifyOtp } from '../action/commands/verify-otp';
import { VerifyPin } from '../action/commands/verify-pin';
import { VerifyReferralCode } from '../action/commands/verify-referral-code';
import { CreatePinFailed } from '../action/events/create-pin-failed';
import { CreatePinSucceed } from '../action/events/create-pin-succeed';
import { GetNoPesertaFailed } from '../action/events/get-no-peserta-failed';
import { GetNoPesertaSucceed } from '../action/events/get-no-peserta-succeed';
import { LogUserActivityFailed } from '../action/events/log-user-activity-failed';
import { LogUserActivitySucceed } from '../action/events/log-user-activity-succeed';
import { LoginFailed } from '../action/events/login-failed';
import { LoginSucceed } from '../action/events/login-succeed';
import { LupaPinFailed } from '../action/events/lupa-pin-failed';
import { LupaPinSucceed } from '../action/events/lupa-pin-succeed';
import { RequestOtpFailed } from '../action/events/request-otp-failed';
import { RequestOtpSucceed } from '../action/events/request-otp-succeed';
import { VerifyOtpFailed } from '../action/events/verify-otp-failed';
import { VerifyOtpSucceed } from '../action/events/verify-otp-succeed';
import { VerifyPinFailed } from '../action/events/verify-pin-failed';
import { VerifyPinSucceed } from '../action/events/verify-pin-succeed';
import { VerifyReferralCodeFailed } from '../action/events/verify-referral-code-failed';
import { VerifyReferralCodeSucceed } from '../action/events/verify-referral-code-succeed';
import { AuthService } from '../services/auth.service';

import { GetToken } from '../action/commands/get-token';
import { GetTokenSucceed } from '../action/events/get-token-succeed';
import { GetTokenFailed } from '../action/events/get-token-failed';
import { NeedVerification } from '../action/commands/need-verification';
import { NeedVerificationSucceed } from '../action/events/need-verification-succeed';
import { NeedVerificationFailed } from '../action/events/need-verification-failed';
import { GetTokenByIdProfil } from '../action/commands/get-token-by-id-profil';
import { GetTokenByIdProfilSucceed } from '../action/events/get-token-by-id-profil-succeed';
import { GetTokenByIdProfilFailed } from '../action/events/get-token-by-id-profil-failed';
import { RefreshToken } from '../action/commands/refresh-token';
import { RefreshTokenSucceed } from '../action/events/refresh-token-succed';
import { RefreshTokenFailed } from '../action/events/refresh-token-failed';
import { TokenResponseFailed } from '../action/events/token-response-failed';

import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { SaveUserSession } from '../action/commands/save-user-session';
import { SaveUserSessionFailed } from '../action/events/save-user-session-failed';
import { SaveUserSessionSucceed } from '../action/events/save-user-session-succeed';
import { DeleteProfil } from '../action/commands/delete-profil';
import { DeleteProfilSucceed } from '../action/events/delete-profil-succeed';
import { DeleteProfilFailed } from '../action/events/delete-profil-failed';

@Injectable({ providedIn: 'root' })
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private storageService: StorageService
  ) {}

  createPin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreatePin),
      mergeMap(({ async, payload }) =>
        this.service.createPin(payload).pipe(
          map((response) => {
            return CreatePinSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                CreatePinFailed({ response: error }),
              ]);
            }
            return of(CreatePinFailed({ response: error }));
          })
        )
      )
    )
  );

  getNoPeserta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetNoPeserta),
      mergeMap(({ async, payload }) =>
        this.service.getNoPeserta(payload).pipe(
          map((response) => {
            return GetNoPesertaSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetNoPesertaFailed({ response: error }),
              ]);
            }
            return of(GetNoPesertaFailed({ response: error }));
          })
        )
      )
    )
  );

  logUserActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogUserActivity),
      mergeMap(({ async, payload }) =>
        this.service.logUserActivity(payload).pipe(
          map((response) => {
            return LogUserActivitySucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                LogUserActivityFailed({ response: error }),
              ]);
            }
            return of(LogUserActivityFailed({ response: error }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Login),
      mergeMap(({ async, payload }) =>
        this.service.login(payload).pipe(
          map((response) => {
            return LoginSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                LoginFailed({ response: error }),
              ]);
            }
            return of(LoginFailed({ response: error }));
          })
        )
      )
    )
  );

  lupaPin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LupaPin),
      mergeMap(({ async, payload }) =>
        this.service.lupaPin(payload).pipe(
          map((response) => {
            return LupaPinSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                LupaPinFailed({ response: error }),
              ]);
            }
            return of(LupaPinFailed({ response: error }));
          })
        )
      )
    )
  );

  requestOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestOtp),
      mergeMap(({ async, payload }) =>
        this.service.requestOtp(payload).pipe(
          map((response) => {
            return RequestOtpSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                RequestOtpFailed({ response: error }),
              ]);
            }
            return of(RequestOtpFailed({ response: error }));
          })
        )
      )
    )
  );

  SaveUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaveUserSession),
      mergeMap(({ async, payload }) =>
        this.service.saveUserSession(payload).pipe(
          map((response) => {
            return SaveUserSessionSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                SaveUserSessionFailed({
                  response: error,
                }),
                SaveUserSessionFailed({ response: error }),
              ]);
            }
            return of(SaveUserSessionFailed({ response: error }));
          })
        )
      )
    )
  );

  verifyOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyOtp),
      mergeMap(({ async, payload }) =>
        this.service.verifyOtp(payload).pipe(
          map((response) => VerifyOtpSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                VerifyOtpFailed({ response: error }),
              ]);
            }
            return of(VerifyOtpFailed({ response: error }));
          })
        )
      )
    )
  );

  verifyPin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyPin),
      mergeMap(({ async, payload }) =>
        this.service.verifyPin(payload).pipe(
          map((response) => VerifyPinSucceed({ response })),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                VerifyPinFailed({ response: error }),
              ]);
            }
            return of(VerifyPinFailed({ response: error }));
          })
        )
      )
    )
  );

  verifyReferralCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyReferralCode),
      mergeMap(({ async, payload }) =>
        this.service.verifyReferralCode(payload).pipe(
          map((response) => {
            return VerifyReferralCodeSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                VerifyReferralCodeFailed({ response: error }),
              ]);
            }
            return of(VerifyReferralCodeFailed({ response: error }));
          })
        )
      )
    )
  );

  getToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetToken),
      mergeMap(({ async, payload }) =>
        this.service.getToken(payload).pipe(
          map((response) => {
            return GetTokenSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetTokenFailed({ response: error }),
              ]);
            }
            return of(GetTokenFailed({ response: error }));
          })
        )
      )
    )
  );

  needVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NeedVerification),
      mergeMap(({ async, payload }) =>
        this.service.needVerification(payload).pipe(
          map((response) => {
            return NeedVerificationSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                NeedVerificationFailed({ response: error }),
              ]);
            }
            return of(NeedVerificationFailed({ response: error }));
          })
        )
      )
    )
  );

  getTokenByIdProfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetTokenByIdProfil),
      mergeMap(({ async, payload }) =>
        this.service.getTokenByIdProfil(payload).pipe(
          map((response) => {
            return GetTokenByIdProfilSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetTokenByIdProfilFailed({ response: error }),
              ]);
            }
            return of(GetTokenByIdProfilFailed({ response: error }));
          })
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RefreshToken),
      mergeMap(({ async }) =>
        this.service.refreshToken().pipe(
          map((response) => {
            const { token, refreshToken, timestamp } = response?.data || {};
            if (token && refreshToken && timestamp) {
              this.storageService.setStorage(StorageKeyEnum.TOKEN, token);
              this.storageService.setStorage(
                StorageKeyEnum.REFRESH_TOKEN,
                refreshToken
              );
              this.storageService.setStorage(
                StorageKeyEnum.TIMESTAPM,
                timestamp
              );
            }
            return RefreshTokenSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                RefreshTokenFailed({ response: error }),
              ]);
            }
            return of(RefreshTokenFailed({ response: error }));
          })
        )
      )
    )
  );

  deleteProfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteProfil),
      mergeMap(({ async }) =>
        this.service.deleteProfil().pipe(
          map((response) => {
            return DeleteProfilSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                DeleteProfilFailed({ response: error }),
              ]);
            }
            return of(DeleteProfilFailed({ response: error }));
          })
        )
      )
    )
  );
}
