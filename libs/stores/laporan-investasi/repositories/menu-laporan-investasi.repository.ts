import { Injectable } from '@angular/core';
import { LaporanInvestasiModel } from '@controllers/menu-laporan-investasi';
import { createSelector, select, Store } from '@ngrx/store';
import { DataResponse, DataResponseArray } from '@shared';
import { Observable } from 'rxjs';
import { MenuLaporanInvestasiState } from '../states/menu-laporan-investasi.state';

@Injectable()
export class MenuLaporanInvestasiRepository {
  private _state = (state: any) => state.menuLaporanInvestasi;
  constructor(private store: Store<MenuLaporanInvestasiState>) {}

  // Repo Get LaporanInvestasi Landing
  public getLaporanInvestasiLanding$(): Observable<
    DataResponseArray<LaporanInvestasiModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi List
  public getLaporanInvestasiList$(): Observable<
    DataResponseArray<LaporanInvestasiModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi Latest
  public getLaporanInvestasiLatest$(): Observable<
    DataResponseArray<LaporanInvestasiModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi Footer
  public getLaporanInvestasiFooter$(): Observable<
    DataResponseArray<LaporanInvestasiModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi Detail
  public getLaporanInvestasiDetail$(): Observable<
    DataResponse<LaporanInvestasiModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuLaporanInvestasiState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }
}
