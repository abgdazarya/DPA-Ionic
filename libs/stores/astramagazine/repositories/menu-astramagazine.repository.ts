import { Injectable } from '@angular/core';
import {
  AstramagazineModel,
  AstramagazineOptionModel,
} from '@controllers/menu-astramagazine';
import { createSelector, select, Store } from '@ngrx/store';
import { DataResponse, DataResponsePagination } from '@shared';
import { Observable } from 'rxjs';
import { MenuAstramagazineState } from '../states/menu-astramagazine.state';

@Injectable()
export class MenuAstramagazineRepository {
  private _state = (state: any) => state.menuAstramagazine;
  constructor(private store: Store<MenuAstramagazineState>) {}

  // Repo Get Astramagazine Landing
  public getAstramagazineLanding$(): Observable<
    DataResponsePagination<AstramagazineModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine List
  public getAstramagazineList$(): Observable<
    DataResponsePagination<AstramagazineModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  public getAstramagazineManage$(): Observable<
    DataResponsePagination<AstramagazineModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineState) => state?.manage
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine Latest
  public getAstramagazineLatest$(): Observable<
    DataResponsePagination<AstramagazineModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine Footer
  public getAstramagazineFooter$(): Observable<
    DataResponsePagination<AstramagazineModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine Detail
  public getAstramagazineDetail$(): Observable<
    DataResponse<AstramagazineModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Astramagazine Option
  public getAstramagazineOption$(): Observable<
    DataResponse<AstramagazineOptionModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuAstramagazineState) => state?.option
    );
    return this.store.pipe(select(selector));
  }
}
