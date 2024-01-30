import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { MenuInteractionState } from '../states/menu.interaction.state';

@Injectable()
export class MenuInteractionRepository {
  private _state = (state: any) => state.menuInteraction;
  constructor(private store: Store<MenuInteractionState>) {}

  // Repo Astra Hub Interaction
  public getAstraHubInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.astraHub?.main
    );
    return this.store.pipe(select(selector));
  }
  // Repo Get News Landing Interaction
  public getNewsLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.news?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News List Interaction
  public getNewsListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.news?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Footer Interaction
  public getNewsFooterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.news?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Latest Interaction
  public getNewsLatestInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.news?.latest
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Detail Interaction
  public getNewsDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.news?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get News Landing Interaction
  public getJobLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.job?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job List Interaction
  public getJobListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.job?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Recommendation Interaction
  public getJobRecommendationInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.job?.recommendation
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Job Detail Interaction
  public getJobDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.job?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Landing Interaction
  public getDpaTvLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.dpaTv?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv List Interaction
  public getDpaTvListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.dpaTv?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Footer Interaction
  public getDpaTvFooterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.dpaTv?.footer
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get DpaTv Detail Interaction
  public getDpaTvDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.dpaTv?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Content Promo Landing Interaction
  public getContentPromoLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.contentPromo?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Content Promo List Interaction
  public getContentPromoListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.contentPromo?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Content Promo Detail Interaction
  public getContentPromoDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.contentPromo?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Privacy Policy Landing Interaction
  public getPrivacyPolicyLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.privacyPolicy?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Privacy Policy List Interaction
  public getPrivacyPolicyListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.privacyPolicy?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AstraMagazine Landing Interaction
  public getAstraMagazineLandingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.astraMagazine?.landing
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AstraMagazine List Interaction
  public getAstraMagazineListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.astraMagazine?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AstraMagazine Detail Interaction
  public getAstraMagazineDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.astraMagazine?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Saldo Interaction
  public getSaldoInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.saldo?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Monthly Saldo Interaction
  public getFilterInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.astraMagazine.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Monthly Saldo Interaction
  public getMonthlySaldoInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.saldo?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi List Interaction
  public getLaporanInvestasiListInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.laporanInvestasi?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get LaporanInvestasi Detail Interaction
  public getLaporanInvestasiDetailInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.laporanInvestasi?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get KategoriRuangPensiun List
  public getKategoriRuangPensiunList$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.kategoriRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AllKonten List
  public getAllKontenRuangPensiunList$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.allKontenRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  public getAllKontenRuangPensiunInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.allKontenRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get PostinganRuangPensiun List
  public getPostinganRuangPensiunList$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.postinganRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get PostinganRuangPensiun Detail
  public getPostinganRuangPensiunDetail$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.postinganRuangPensiun?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get AllKontenRuangPensiunManagel
  public getAllKontenRuangPensiunManage$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.allKontenRuangPensiun?.manage
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get PostinganRuangPensiunManagel
  public getPostinganRuangPensiunManage$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.postinganRuangPensiun?.manage
    );
    return this.store.pipe(select(selector));
  }

  public postTambahPostinganInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.postinganRuangPensiun.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get JualBeliRuangPensiun List
  public getJualBeliRuangPensiunList$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.jualBeliRuangPensiun?.list
    );
    return this.store.pipe(select(selector));
  }

  public postTambahJualBeliInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.jualBeliRuangPensiun.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get JualBeliRuangPensiun Detail
  public getJualBeliRuangPensiunDetail$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.jualBeliRuangPensiun?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get JualBeliRuangPensiun Detail
  public getJualBeliRuangPensiunManage$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.jualBeliRuangPensiun?.manage
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get FriendList List
  public getFriendList$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.friendList?.list
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get FriendList Detail
  public getFriendListDetail$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.friendList?.detail
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Hub Dpa
  public getHubDpaInteraction$(): Observable<
    InteractionState | undefined | null
  > {
    const selector = createSelector(
      this._state,
      (state: MenuInteractionState) => state?.hubDpa?.main
    );
    return this.store.pipe(select(selector));
  }
}
