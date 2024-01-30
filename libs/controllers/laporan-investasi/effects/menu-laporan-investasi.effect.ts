import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { GetDetailLaporanInvestasi } from '../actions/commands/get-detail-laporan-investasi';
import { GetListLaporanInvestasi } from '../actions/commands/get-list-laporan-investasi';
import { GetPublicListLaporanInvestasi } from '../actions/commands/get-public-list-laporan-investasi';
import { GetDetailLaporanInvestasiFailed } from '../actions/events/get-detail-laporan-investasi-failed';
import { GetDetailLaporanInvestasiSucceed } from '../actions/events/get-detail-laporan-investasi-succeed';
import { GetListLaporanInvestasiFailed } from '../actions/events/get-list-laporan-investasi-failed';
import { GetListLaporanInvestasiSucceed } from '../actions/events/get-list-laporan-investasi-succeed';
import { MenuLaporanInvestasiService } from '../services/menu-laporan-investasi.service';
import { MenuPublicLaporanInvestasiService } from '../services/menu-public-laporan-investasi.service';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable()
export class MenuLaporanInvestasiEffect {
  constructor(
    private actions$: Actions,
    private service: MenuLaporanInvestasiService,
    private publicService: MenuPublicLaporanInvestasiService
  ) {}

  getPublicListLaporanInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListLaporanInvestasi),
      mergeMap(({ async, payload, dataType }) =>
        this.publicService.getPublicListLaporanInvestasi(payload).pipe(
          map((response) => {
            return GetListLaporanInvestasiSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListLaporanInvestasiFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListLaporanInvestasiFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getListLaporanInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListLaporanInvestasi),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getListLaporanInvestasi(payload).pipe(
          map((response) => {
            return GetListLaporanInvestasiSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListLaporanInvestasiFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListLaporanInvestasiFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getDetailLaporanInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailLaporanInvestasi),
      mergeMap(({ async, payload }) =>
        this.service.getDetailLaporanInvestasi(payload).pipe(
          map((response) => {
            return GetDetailLaporanInvestasiSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailLaporanInvestasiFailed({ response: error }),
              ]);
            }
            return of(GetDetailLaporanInvestasiFailed({ response: error }));
          })
        )
      )
    )
  );
}
