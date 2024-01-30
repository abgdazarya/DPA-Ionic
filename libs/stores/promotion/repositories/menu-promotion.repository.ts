import { Injectable } from '@angular/core';
import { PromotionModel } from '@controllers/menu-promotion';
import { createSelector, select, Store } from '@ngrx/store';
import {
  DataResponse,
  DataResponseArray,
  DataResponsePagination,
} from '@shared';
import { Observable } from 'rxjs';
import { MenuPromotionState } from '../states/menu-promotion.state';
import { CategoryPromotionModel } from 'libs/controllers/promotion/models/category-promotion.model';
import { CouponVerifyModel } from 'libs/controllers/promotion/models/coupon-verify.model';
import { CouponPromotionModel } from 'libs/controllers/promotion/models/coupon-promotion.model';

@Injectable()
export class MenuPromotionRepository {
  private _state = (state: any) => state.menuPromotion;
  constructor(private store: Store<MenuPromotionState>) {}

  // Repo Get Promotion Landing
  public getPromotionLanding$(): Observable<
    DataResponsePagination<PromotionModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion List
  public getPromotionList$(): Observable<
    DataResponsePagination<PromotionModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion Latest
  public getPromotionLatest$(): Observable<
    DataResponsePagination<PromotionModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion Footer
  public getPromotionFooter$(): Observable<
    DataResponsePagination<PromotionModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion Detail
  public getPromotionDetail$(): Observable<
    DataResponse<PromotionModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion List
  public getCategoryPromotion$(): Observable<
    DataResponseArray<CategoryPromotionModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionState) => state?.categoryPromo
    );
    return this.store.pipe(select(selector));
  }

  public getCouponVerify$(): Observable<
    DataResponse<CouponVerifyModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionState) => state?.couponVerify
    );
    return this.store.pipe(select(selector));
  }

  public submitCouponPromosi$(): Observable<
    DataResponse<CouponPromotionModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionState) => state?.promotionCoupon
    );
    return this.store.pipe(select(selector));
  }
}
