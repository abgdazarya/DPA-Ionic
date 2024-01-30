import { Injectable } from '@angular/core';
import { Popup, UserInfo, AksesMenuModel } from '@controllers/home';
import { Store, createSelector, select } from '@ngrx/store';
import { DataResponse, DataResponseArray } from '@shared';
import { Observable } from 'rxjs';
import { HomeState } from '../states/home.state';
import { BaseProfile } from '@controllers/profile';

@Injectable()
export class HomeRepository {
  private _state = (state: any) => state.home;
  constructor(private store: Store<HomeState>) {}

  // Repo Get User Info
  public getUserInfo$(): Observable<DataResponse<UserInfo> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: HomeState) => state?.userInfo?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Custom Popup
  public getCustomPopup$(): Observable<
    DataResponseArray<Popup> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: HomeState) => state?.customPopup?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Popup Birthday Resign
  public getPopupBirthdayResign$(): Observable<
    DataResponseArray<Popup> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: HomeState) => state?.birthdayPopup?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Akses Menu
  public getAksesMenu$(): Observable<
    DataResponse<AksesMenuModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: HomeState) => state?.aksesMenu?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Customer Concern
  public getCustomerConcern$(): Observable<
    DataResponse<BaseProfile> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: HomeState) => state?.customerConcern?.main
    );
    return this.store.pipe(select(selector));
  }
}
