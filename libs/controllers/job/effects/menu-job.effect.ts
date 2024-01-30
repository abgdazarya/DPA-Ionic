import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { GetDetailJob } from '../actions/commands/get-detail-job';
import { GetListJob } from '../actions/commands/get-list-job';
import { GetPublicListJob } from '../actions/commands/get-public-list-job';
import { GetDetailJobFailed } from '../actions/events/get-detail-job-failed';
import { GetDetailJobSucceed } from '../actions/events/get-detail-job-succeed';
import { GetListJobFailed } from '../actions/events/get-list-job-failed';
import { GetListJobSucceed } from '../actions/events/get-list-job-succeed';
import { MenuJobService } from '../services/menu-job.service';
import { MenuPublicJobService } from '../services/menu-public-job.service';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable()
export class MenuJobEffect {
  constructor(
    private actions$: Actions,
    private service: MenuJobService,
    private publicService: MenuPublicJobService
  ) {}

  getPublicListJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListJob),
      mergeMap(({ async, payload, dataType }) =>
        this.publicService.getPublicListJob(payload).pipe(
          map((response) => {
            return GetListJobSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListJobFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListJobFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getListJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListJob),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getListJob(payload).pipe(
          map((response) => {
            return GetListJobSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListJobFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListJobFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getDetailJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailJob),
      mergeMap(({ async, payload }) =>
        this.service.getDetailJob(payload).pipe(
          map((response) => {
            return GetDetailJobSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailJobFailed({
                  response: { ...error, data: null },
                }),
              ]);
            }
            return of(
              GetDetailJobFailed({ response: { ...error, data: null } })
            );
          })
        )
      )
    )
  );
}
