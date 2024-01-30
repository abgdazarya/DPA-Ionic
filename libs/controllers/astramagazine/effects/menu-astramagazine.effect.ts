import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { GetDetailAstramagazine } from '../actions/commands/get-detail-astramagazine';
import { GetListAstramagazine } from '../actions/commands/get-list-astramagazine';
import { GetPublicListAstramagazine } from '../actions/commands/get-public-list-astramagazine';
import { GetDetailAstramagazineFailed } from '../actions/events/get-detail-astramagazine-failed';
import { GetDetailAstramagazineSucceed } from '../actions/events/get-detail-astramagazine-succeed';
import { GetListAstramagazineFailed } from '../actions/events/get-list-astramagazine-failed';
import { GetListAstramagazineSucceed } from '../actions/events/get-list-astramagazine-succeed';
import { MenuAstramagazineService } from '../services/menu-astramagazine.service';
import { MenuMasterAstramagazineService } from '../services/menu-master-astramagazine.service';
import { MenuPublicAstramagazineService } from '../services/menu-public-astramagazine.service';
import { GetOptionAstramagazine } from '../actions/commands/get-option-astramagazine';
import { GetOptionAstramagazineSucceed } from '../actions/events/get-option-astramagazine-succeed';
import { GetOptionAstramagazineFailed } from '../actions/events/get-option-astramagazine-failed';

@Injectable({ providedIn: 'root' })
export class MenuAstramagazineEffect {
  constructor(
    private actions$: Actions,
    private service: MenuAstramagazineService,
    private publicService: MenuPublicAstramagazineService,
    private masterService: MenuMasterAstramagazineService
  ) {}

  getPublicListAstramagazine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListAstramagazine),
      mergeMap(({ async, payload, dataType }) =>
        this.publicService.getPublicListAstramagazine(payload).pipe(
          map((response) => {
            return GetListAstramagazineSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            return of(
              GetListAstramagazineFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getListAstramagazine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListAstramagazine),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getListAstramagazine(payload).pipe(
          map((response) => {
            return GetListAstramagazineSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            return of(
              GetListAstramagazineFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getDetailAstramagazine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailAstramagazine),
      mergeMap(({ async, payload }) =>
        this.service.getDetailAstramagazine(payload).pipe(
          map((response) => {
            return GetDetailAstramagazineSucceed({ response });
          }),
          catchError(({ error }) => {
            return of(
              GetDetailAstramagazineFailed({
                response: { ...error, data: null },
              })
            );
          })
        )
      )
    )
  );

  getOptionAstramagazine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetOptionAstramagazine),
      mergeMap(({ async, payload }) =>
        this.masterService.getOptionAstramagazine(payload).pipe(
          map((response) => {
            return GetOptionAstramagazineSucceed({ response });
          }),
          catchError(({ error }) => {
            return of(
              GetOptionAstramagazineFailed({
                response: { ...error, data: null },
              })
            );
          })
        )
      )
    )
  );
}
