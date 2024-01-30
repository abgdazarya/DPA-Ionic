import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { GetDetailDpaTv } from '../actions/commands/get-detail-dpa-tv';
import { GetListDpaTv } from '../actions/commands/get-list-dpa-tv';
import { GetPublicListDpaTv } from '../actions/commands/get-public-list-dpa-tv';
import { GetDetailDpaTvFailed } from '../actions/events/get-detail-dpa-tv-failed';
import { GetDetailDpaTvSucceed } from '../actions/events/get-detail-dpa-tv-succeed';
import { GetListDpaTvFailed } from '../actions/events/get-list-dpa-tv-failed';
import { GetListDpaTvSucceed } from '../actions/events/get-list-dpa-tv-succeed';
import { MenuDpaTvService } from '../services/menu-dpa-tv.service';
import { MenuPublicDpaTvService } from '../services/menu-public-dpa-tv.service';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable({ providedIn: 'root' })
export class MenuDpaTvEffect {
  constructor(
    private actions$: Actions,
    private service: MenuDpaTvService,
    private publicService: MenuPublicDpaTvService
  ) {}

  getPublicListDpaTv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListDpaTv),
      mergeMap(({ async, payload, dataType }) =>
        this.publicService.getPublicListDpaTv(payload).pipe(
          map((response) => {
            return GetListDpaTvSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListDpaTvFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListDpaTvFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getListDpaTv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListDpaTv),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getListDpaTv(payload).pipe(
          map((response) => {
            return GetListDpaTvSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListDpaTvFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListDpaTvFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getDetailDpaTv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailDpaTv),
      mergeMap(({ async, payload }) =>
        this.service.getDetailDpaTv(payload).pipe(
          map((response) => {
            return GetDetailDpaTvSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailDpaTvFailed({ response: { ...error, data: null } }),
              ]);
            }
            return of(
              GetDetailDpaTvFailed({ response: { ...error, data: null } })
            );
          })
        )
      )
    )
  );
}
