import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { GetDetailPromotion } from '../actions/commands/get-detail-promotion';
import { GetListPromotion } from '../actions/commands/get-list-promotion';
import { GetPublicListPromotion } from '../actions/commands/get-public-list-promotion';
import { GetDetailPromotionFailed } from '../actions/events/get-detail-promotion-failed';
import { GetDetailPromotionSucceed } from '../actions/events/get-detail-promotion-succeed';
import { GetListPromotionFailed } from '../actions/events/get-list-promotion-failed';
import { GetListPromotionSucceed } from '../actions/events/get-list-promotion-succeed';
import { MenuPromotionService } from '../services/menu-promotion.service';
import { MenuPublicPromotionService } from '../services/menu-public-promotion.service';
import { GetCategoryPromotionSucceed } from '../actions/events/get-category-promotion-succeed';
import { GetCategoryPromotionFailed } from '../actions/events/get-category-promotion-failed';
import { GetCategoryPromotion } from '../actions/commands/get-category-promotion';
import { GetCouponVerify } from '../actions/commands/get-coupon-verify';
import { GetCouponVerifySucceed } from '../actions/events/get-coupon-verify-succeed';
import { GetCouponVerifyFailed } from '../actions/events/get-coupon-verify-failed';
import { SubmitCouponPromotionFailed } from '../actions/events/get-coupon-promotion-failed';
import { SubmitCouponPromotionSucceed } from '../actions/events/get-coupon-promotion-succeed';
import { SubmitCouponPromotion } from '../actions/commands/get-coupon-promotion';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable()
export class MenuPromotionEffect {
  constructor(
    private actions$: Actions,
    private service: MenuPromotionService,
    private publicService: MenuPublicPromotionService
  ) {}

  getPublicListPromotion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListPromotion),
      mergeMap(({ async, payload, dataType }) =>
        this.publicService.getPublicListPromotion(payload).pipe(
          map((response) => {
            return GetListPromotionSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListPromotionFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListPromotionFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getListPromotion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListPromotion),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getListPromotion(payload).pipe(
          map((response) => {
            return GetListPromotionSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListPromotionFailed({
                  response: { ...error, data: null },
                  dataType,
                }),
              ]);
            }
            return of(
              GetListPromotionFailed({
                response: { ...error, data: null },
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getDetailPromotion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailPromotion),
      mergeMap(({ async, payload }) =>
        this.service.getDetailPromotion(payload).pipe(
          map((response) => {
            return GetDetailPromotionSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailPromotionFailed({
                  response: { ...error, data: null },
                }),
              ]);
            }
            return of(
              GetDetailPromotionFailed({ response: { ...error, data: null } })
            );
          })
        )
      )
    )
  );

  getCategoryPromotion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCategoryPromotion),
      mergeMap(({ async, payload }) =>
        this.service.getCategoryPromotion(payload).pipe(
          map((response) => {
            return GetCategoryPromotionSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetCategoryPromotionFailed({
                  response: { ...error, data: null },
                }),
              ]);
            }
            return of(
              GetCategoryPromotionFailed({
                response: { ...error, data: null },
              })
            );
          })
        )
      )
    )
  );

  getCouponVerify$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCouponVerify),
      mergeMap(({ async, payload }) =>
        this.service.getCouponVerify(payload).pipe(
          map((response) => {
            return GetCouponVerifySucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetCouponVerifyFailed({
                  response: { ...error, data: null },
                }),
              ]);
            }
            return of(
              GetCouponVerifyFailed({
                response: { ...error, data: null },
              })
            );
          })
        )
      )
    )
  );

  submitCouponPromosi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubmitCouponPromotion),
      mergeMap(({ async, payload }) =>
        this.service.submitCouponPromosi(payload).pipe(
          map((response) => {
            return SubmitCouponPromotionSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                SubmitCouponPromotionFailed({
                  response: { ...error, data: null },
                }),
              ]);
            }
            return of(
              SubmitCouponPromotionFailed({
                response: { ...error, data: null },
              })
            );
          })
        )
      )
    )
  );
}
