import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { GetDetailNews } from '../actions/commands/get-detail-news';
import { GetListNews } from '../actions/commands/get-list-news';
import { GetPublicListNews } from '../actions/commands/get-public-list-news';
import { GetDetailNewsFailed } from '../actions/events/get-detail-news-failed';
import { GetDetailNewsSucceed } from '../actions/events/get-detail-news-succeed';
import { GetListNewsFailed } from '../actions/events/get-list-news-failed';
import { GetListNewsSucceed } from '../actions/events/get-list-news-succeed';
import { MenuNewsService } from '../services/menu-news.service';
import { MenuPublicNewsService } from '../services/menu-public-news.service';
import { SetReadNews } from '../actions/commands/set-read-news';
import { SetReadNewsSucceed } from '../actions/events/set-read-news-succeed';
import { SetReadNewsFailed } from '../actions/events/set-read-news-failed';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable()
export class MenuNewsEffect {
  constructor(
    private actions$: Actions,
    private service: MenuNewsService,
    private publicService: MenuPublicNewsService
  ) {}

  getPublicListNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListNews),
      mergeMap(({ async, payload, dataType }) =>
        this.publicService.getPublicListNews(payload).pipe(
          map((response) => {
            return GetListNewsSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListNewsFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListNewsFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getListNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListNews),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getListNews(payload).pipe(
          map((response) => {
            return GetListNewsSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListNewsFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListNewsFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getDetailNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailNews),
      mergeMap(({ async, payload }) =>
        this.service.getDetailNews(payload).pipe(
          map((response) => {
            return GetDetailNewsSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailNewsFailed({
                  response: { ...error, data: null },
                }),
              ]);
            }
            return of(
              GetDetailNewsFailed({ response: { ...error, data: null } })
            );
          })
        )
      )
    )
  );

  setReadNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetReadNews),
      mergeMap(({ async, payload }) =>
        this.service.setReadNews(payload).pipe(
          map((response) => {
            return SetReadNewsSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                SetReadNewsFailed({
                  response: { ...error, data: null },
                }),
              ]);
            }
            return of(
              SetReadNewsFailed({ response: { ...error, data: null } })
            );
          })
        )
      )
    )
  );
}
