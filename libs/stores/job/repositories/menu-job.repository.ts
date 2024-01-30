import { Injectable } from '@angular/core';
import { JobModel } from '@controllers/menu-job';
import { createSelector, select, Store } from '@ngrx/store';
import { DataResponse, DataResponsePagination } from '@shared';
import { Observable } from 'rxjs';
import { MenuJobState } from '../states/menu-job.state';

@Injectable()
export class MenuJobRepository {
  private _state = (state: any) => state.menuJob;
  constructor(private store: Store<MenuJobState>) {}

  // Repo Get Job Landing
  public getJobLanding$(): Observable<
    DataResponsePagination<JobModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuJobState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job List
  public getJobList$(): Observable<
    DataResponsePagination<JobModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuJobState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Latest
  public getJobLatest$(): Observable<
    DataResponsePagination<JobModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuJobState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Footer
  public getJobFooter$(): Observable<
    DataResponsePagination<JobModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuJobState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Footer
  public getJobRecommendation$(): Observable<
    DataResponsePagination<JobModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuJobState) => state?.recommendation
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Detail
  public getJobDetail$(): Observable<
    DataResponse<JobModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuJobState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }
}
