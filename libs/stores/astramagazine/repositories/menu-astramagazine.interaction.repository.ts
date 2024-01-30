import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { MenuAstramagazineInteractionState } from '../states/menu-astramagazine.interaction.state';

@Injectable()
export class MenuAstramagazineInteractionRepository {
  private _state = (state: any) => state.menuAstramagazineInteraction;
  constructor(private store: Store<MenuAstramagazineInteractionState>) {}

  // Repo Get Astramagazine Landing Interaction
  public getAstramagazineLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineInteractionState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine List Interaction
  public getAstramagazineListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineInteractionState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine Latest Interaction
  public getAstramagazineLatestInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineInteractionState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine Footer Interaction
  public getAstramagazineFooterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineInteractionState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine Detail Interaction
  public getAstramagazineDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineInteractionState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine Option Interaction
  public getAstramagazineOptionInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineInteractionState) => state?.option
    );
    return this.store.pipe(select(selector));
  }
}
