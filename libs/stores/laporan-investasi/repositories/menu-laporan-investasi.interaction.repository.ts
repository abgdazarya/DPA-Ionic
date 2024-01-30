import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { MenuLaporanInvestasiInteractionState } from '../states/menu-laporan-investasi.interaction.state';

@Injectable()
export class MenuLaporanInvestasiInteractionRepository {
  private _state = (state: any) => state.menuLaporanInvestasiInteraction;
  constructor(private store: Store<MenuLaporanInvestasiInteractionState>) {}

  // Repo Get LaporanInvestasi Landing Interaction
  public getLaporanInvestasiLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiInteractionState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi List Interaction
  public getLaporanInvestasiListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiInteractionState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi Latest Interaction
  public getLaporanInvestasiLatestInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiInteractionState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi Footer Interaction
  public getLaporanInvestasiFooterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiInteractionState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi Detail Interaction
  public getLaporanInvestasiDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiInteractionState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }
}
