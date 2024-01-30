import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { GetCustomPopup } from '../action/commands/get-custom-popup';
import { GetUserInfo } from '../action/commands/get-user-info';
import { GetCustomPopupFailed } from '../action/events/get-custom-popup-failed';
import { GetCustomPopupSucceed } from '../action/events/get-custom-popup-succeed';
import { GetUserInfoFailed } from '../action/events/get-user-info-failed';
import { GetUserInfoSucceed } from '../action/events/get-user-info-succeed';
import { HomeService } from '../services/home.service';
import { GetPopupBirthdayResign } from '../action/commands/get-popup-birthday-resign';
import { GetPopupBirthdayResignSucceed } from '../action/events/get-popup-birthday-resign-succeed';
import { GetPopupBirthdayResignFailed } from '../action/events/get-popup-birthday-resign-failed';
import { GetAksesMenu } from '../action/commands/get-akses-menu';
import { GetAksesMenuSucceed } from '../action/events/get-akses-menu-succeed';
import { GetAksesMenuFailed } from '../action/events/get-akses-menu-failed';
import { SaveCustomerConcernSucceed } from '../action/events/save-customer-concern-succeed';
import { SaveCustomerConcernFailed } from '../action/events/save-customer-concern-failed';
import { SaveCustomerConcern } from '../action/commands/save-customer-concern';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable()
export class HomeEffect {
  constructor(private actions$: Actions, private service: HomeService) {}

  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUserInfo),
      mergeMap(({ async, payload }) =>
        this.service.getUserInfo(payload).pipe(
          map((response) => {
            return GetUserInfoSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetUserInfoFailed({ response: error }),
              ]);
            }
            return of(GetUserInfoFailed({ response: error }));
          })
        )
      )
    )
  );

  getCustomPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCustomPopup),
      mergeMap(({ async, payload }) =>
        this.service.getCustomPopup(payload).pipe(
          map((response) => {
            return GetCustomPopupSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetCustomPopupFailed({ response: error }),
              ]);
            }
            return of(GetCustomPopupFailed({ response: error }));
          })
        )
      )
    )
  );

  getPopupBirthdayResign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPopupBirthdayResign),
      mergeMap(({ async, payload }) =>
        this.service.getPopupBirthdayResign(payload).pipe(
          map((response) => {
            return GetPopupBirthdayResignSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetPopupBirthdayResignFailed({ response: error }),
              ]);
            }
            return of(GetPopupBirthdayResignFailed({ response: error }));
          })
        )
      )
    )
  );

  getAksesMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAksesMenu),
      mergeMap(({ async, payload }) =>
        this.service.getAksesMenu(payload).pipe(
          map((response) => {
            return GetAksesMenuSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetAksesMenuFailed({ response: error }),
              ]);
            }
            return of(GetAksesMenuFailed({ response: error }));
          })
        )
      )
    )
  );

  saveCustomerConcern$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaveCustomerConcern),
      mergeMap(({ async, payload }) =>
        this.service.saveCustomerConcern(payload).pipe(
          map((response) => {
            return SaveCustomerConcernSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                SaveCustomerConcernFailed({ response: error }),
              ]);
            }
            return of(SaveCustomerConcernFailed({ response: error }));
          })
        )
      )
    )
  );
}
