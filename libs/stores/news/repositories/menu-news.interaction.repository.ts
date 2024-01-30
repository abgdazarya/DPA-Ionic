import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { MenuNewsInteractionState } from '../states/menu-news.interaction.state';

@Injectable()
export class MenuNewsInteractionRepository {
  private _state = (state: any) => state.menuNewsInteraction;
  constructor(private store: Store<MenuNewsInteractionState>) {}

  // Repo Get News Landing Interaction
  public getNewsLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuNewsInteractionState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Highlight Interaction
  public getNewsHighlightInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuNewsInteractionState) => state?.highlight
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News List Interaction
  public getNewsListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuNewsInteractionState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Latest Interaction
  public getNewsLatestInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuNewsInteractionState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Footer Interaction
  public getNewsFooterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuNewsInteractionState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Detail Interaction
  public getNewsDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuNewsInteractionState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }
}
