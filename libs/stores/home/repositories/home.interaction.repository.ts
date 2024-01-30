import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { HomeInteractionState } from '../states/home.interaction.state';

@Injectable()
export class HomeInteractionRepository {
  private _state = (state: any) => state.homeInteraction;
  constructor(private store: Store<HomeInteractionState>) {}

  // Repo User Info Interaction
  public getUserInfoInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: HomeInteractionState) => state?.userInfo?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Custom Popup Interaction
  public getCustomPopupInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: HomeInteractionState) => state?.customPopup?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Popup Birthday Resign Interaction
  public getPopupBirthdayResignInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: HomeInteractionState) => state?.birthdayPopup?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Akses Menu
  public getAksesMenuInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: HomeInteractionState) => state?.aksesMenu?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Customer Concern
  public getCustomerConcernInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: HomeInteractionState) => state?.customerConcern?.main
    );
    return this.store.pipe(select(selector));
  }
}
