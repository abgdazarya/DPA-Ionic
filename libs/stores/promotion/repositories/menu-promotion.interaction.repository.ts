import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { MenuPromotionInteractionState } from '../states/menu-promotion.interaction.state';
import { CouponVerifyModel } from 'libs/controllers/promotion/models/coupon-verify.model';

@Injectable()
export class MenuPromotionInteractionRepository {
  private _state = (state: any) => state.menuPromotionInteraction;
  constructor(private store: Store<MenuPromotionInteractionState>) {}

  // Repo Get Promotion Landing Interaction
  public getPromotionLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionInteractionState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion List Interaction
  public getPromotionListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionInteractionState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion Latest Interaction
  public getPromotionLatestInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionInteractionState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion Footer Interaction
  public getPromotionFooterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionInteractionState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Promotion Detail Interaction
  public getPromotionDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionInteractionState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }

  public getCategoryPromotionInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionInteractionState) => state?.categoryPromo
    );
    return this.store.pipe(select(selector));
  }

  public getCouponVerifyInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionInteractionState) => state?.couponVerify
    );
    return this.store.pipe(select(selector));
  }

  public submitCouponPromosiInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuPromotionInteractionState) => state?.promotionCoupon
    );
    return this.store.pipe(select(selector));
  }
}
