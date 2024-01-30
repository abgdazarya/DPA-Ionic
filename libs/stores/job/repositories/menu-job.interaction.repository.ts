import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { MenuJobInteractionState } from '../states/menu-job.interaction.state';

@Injectable()
export class MenuJobInteractionRepository {
  private _state = (state: any) => state.menuJobInteraction;
  constructor(private store: Store<MenuJobInteractionState>) {}

  // Repo Get Job Landing Interaction
  public getJobLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuJobInteractionState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job List Interaction
  public getJobListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuJobInteractionState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Latest Interaction
  public getJobLatestInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuJobInteractionState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Footer Interaction
  public getJobFooterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuJobInteractionState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Recommendation Interaction
  public getJobRecommendationInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuJobInteractionState) => state?.recommendation
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Detail Interaction
  public getJobDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuJobInteractionState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }
}
