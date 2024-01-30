import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { MenuDpaTvInteractionState } from '../states/menu-dpa-tv.interaction.state';

@Injectable()
export class MenuDpaTvInteractionRepository {
  private _state = (state: any) => state.menuDpaTvInteraction;
  constructor(private store: Store<MenuDpaTvInteractionState>) {}

  // Repo Get DpaTv Landing Interaction
  public getDpaTvLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvInteractionState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv List Interaction
  public getDpaTvListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvInteractionState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Latest Interaction
  public getDpaTvLatestInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvInteractionState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Footer Interaction
  public getDpaTvFooterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvInteractionState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Detail Interaction
  public getDpaTvDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvInteractionState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }
}
