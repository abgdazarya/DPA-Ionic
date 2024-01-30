import { Injectable } from '@angular/core';
import { NewsModel } from '@controllers/menu-news';
import { createSelector, select, State, Store } from '@ngrx/store';
import { DataResponse, DataResponsePagination } from '@shared';
import { Observable } from 'rxjs';
import { MenuNewsState } from '../states/menu-news.state';

@Injectable()
export class MenuNewsRepository {
  private _state = (state: any) => state.menuNews;
  constructor(private store: Store<MenuNewsState>) {}

  // Repo Get News Landing
  public getNewsLanding$(): Observable<
    DataResponsePagination<NewsModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuNewsState) => state?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Highlight
  public getNewsHighlight$(): Observable<
    DataResponsePagination<NewsModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuNewsState) => state?.highlight
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News List
  public getNewsList$(): Observable<
    DataResponsePagination<NewsModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuNewsState) => state?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Latest
  public getNewsLatest$(): Observable<
    DataResponsePagination<NewsModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuNewsState) => state?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Footer
  public getNewsFooter$(): Observable<
    DataResponsePagination<NewsModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuNewsState) => state?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Detail
  public getNewsDetail$(): Observable<
    DataResponse<NewsModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuNewsState) => state?.detail
    );
    return this.store.pipe(select(selector));
  }
}
