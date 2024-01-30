import { Injectable } from '@angular/core';
import {
  DpaTv,
  Job,
  LaporanInvestasi,
  News,
  PrivacyPolicy,
  AstraHubData,
  SaldoData,
  PostinganRuangPensiun,
  JualBeliRuangPensiun,
  KategoriRuangPensiun,
  FriendList,
  AllKontenRuangPensiun,
  HubDpaModel,
} from '@controllers/menu';
import { createSelector, select, Store } from '@ngrx/store';
import {
  DataResponse,
  DataResponseArray,
  DataResponsePagination,
} from '@shared';
import { Observable } from 'rxjs';
import { MenuState } from '../states/menu.state';
import { LinkData } from '@controllers/profile';

@Injectable()
export class MenuRepository {
  private _state = (state: any) => state.menu;
  constructor(private store: Store<MenuState>) {}

  public getAstraHub$(): Observable<
    DataResponseArray<AstraHubData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.astraHub?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Landing
  public getNewsLanding$(): Observable<
    DataResponsePagination<News> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.news?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News List
  public getNewsList$(): Observable<
    DataResponsePagination<News> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.news?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Latest
  public getNewsLatest$(): Observable<
    DataResponsePagination<News> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.news?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Footer
  public getNewsFooter$(): Observable<
    DataResponsePagination<News> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.news?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Detail
  public getNewsDetail$(): Observable<DataResponse<News> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.news?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Landing
  public getJobLanding$(): Observable<
    DataResponsePagination<Job> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.job?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job List
  public getJobList$(): Observable<
    DataResponsePagination<Job> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.job?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Recommendation
  public getJobRecommendation$(): Observable<
    DataResponsePagination<Job> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.job?.recommendation
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Detail
  public getJobDetail$(): Observable<DataResponse<Job> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.job?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Landing
  public getDpaTvLanding$(): Observable<
    DataResponsePagination<DpaTv> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.dpaTv?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Footer
  public getDpaTvFooter$(): Observable<
    DataResponsePagination<DpaTv> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.dpaTv?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv List
  public getDpaTvList$(): Observable<
    DataResponsePagination<DpaTv> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.dpaTv?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Detail
  public getDpaTvDetail$(): Observable<DataResponse<DpaTv> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.dpaTv?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Content Promo Landing
  public getContentPromoLanding$(): Observable<
    DataResponsePagination<any> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.contentPromo?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Content Promo List
  public getContentPromoList$(): Observable<
    DataResponsePagination<any> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.contentPromo?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Content Promo Detail
  public getContentPromoDetail$(): Observable<
    DataResponse<any> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.contentPromo?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Privacy Policy Landing
  public getPrivacyPolicyLanding$(): Observable<
    DataResponsePagination<PrivacyPolicy> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.privacyPolicy?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Privacy Policy List
  public getPrivacyPolicyList$(): Observable<
    DataResponsePagination<PrivacyPolicy> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.privacyPolicy?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AstraMagazine Landing
  public getAstraMagazineLanding$(): Observable<
    DataResponsePagination<any> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.astraMagazine?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AstraMagazine List
  public getAstraMagazineList$(): Observable<
    DataResponsePagination<any> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.astraMagazine?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AstraMagazine Detail
  public getAstraMagazineDetail$(): Observable<
    DataResponse<any> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.astraMagazine?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Saldo
  public getSaldo$(): Observable<DataResponse<SaldoData> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.saldo?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Monthly Saldo
  public getMonthlySaldo$(): Observable<
    DataResponse<SaldoData> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.saldo?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi List
  public getLaporanInvestasiList$(): Observable<
    DataResponseArray<LaporanInvestasi> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.laporanInvestasi?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi Detail
  public getLaporanInvestasiDetail$(): Observable<
    DataResponse<LaporanInvestasi> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.laporanInvestasi?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get KategoriRuangPensiun List
  public getKategoriRuangPensiunList$(): Observable<
    DataResponsePagination<KategoriRuangPensiun> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.kategoriRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AllKonten List
  public getAllKontenRuangPensiunList$(): Observable<
    DataResponsePagination<AllKontenRuangPensiun> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.allKontenRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get PostinganRuangPensiun List
  public getPostinganRuangPensiunList$(): Observable<
    DataResponsePagination<PostinganRuangPensiun> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.postinganRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get PostinganRuangPensiun Detail
  public getPostinganRuangPensiunDetail$(): Observable<
    DataResponse<PostinganRuangPensiun> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.postinganRuangPensiun?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get JualBeliRuangPensiun List
  public getJualBeliRuangPensiunList$(): Observable<
    DataResponsePagination<JualBeliRuangPensiun> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.jualBeliRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get JualBeliRuangPensiun Detail
  public getJualBeliRuangPensiunDetail$(): Observable<
    DataResponse<JualBeliRuangPensiun> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.jualBeliRuangPensiun?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get FriendList List
  public getFriendList$(): Observable<
    DataResponsePagination<FriendList> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.friendList?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get FriendList Detail
  public getFriendListDetail$(): Observable<
    DataResponse<FriendList> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.friendList?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Hub Dpa
  public getHubDpaData$(): Observable<
    DataResponseArray<HubDpaModel> | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuState) => state?.hubDpa?.main
    );
    return this.store.pipe(select(selector));
  }
}
