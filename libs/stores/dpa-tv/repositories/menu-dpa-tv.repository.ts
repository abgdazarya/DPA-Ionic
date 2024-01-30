import { Injectable } from '@angular/core';
import { DpaTvModel } from '@controllers/menu-dpa-tv';
import { createSelector, select, Store } from '@ngrx/store';
import { DataResponse, DataResponsePagination } from '@shared';
import { Observable } from 'rxjs';
import { MenuDpaTvState } from '../states/menu-dpa-tv.state';

@Injectable()
export class MenuDpaTvRepository {
  private _state = (state: any) => state.menuDpaTv;
  constructor(private store: Store<MenuDpaTvState>) {}

  // Repo Get DpaTv Landing
  public getDpaTvLanding$(): Observable<
    DataResponsePagination<DpaTvModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv List
  public getDpaTvList$(): Observable<
    DataResponsePagination<DpaTvModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Latest
  public getDpaTvLatest$(): Observable<
    DataResponsePagination<DpaTvModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Footer
  public getDpaTvFooter$(): Observable<
    DataResponsePagination<DpaTvModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Detail
  public getDpaTvDetail$(): Observable<
    DataResponse<DpaTvModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuDpaTvState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }
}
