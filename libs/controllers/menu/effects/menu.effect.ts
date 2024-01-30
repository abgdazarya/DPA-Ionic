import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { GetAstraHub } from '../action/commands/get-astra-hub';
import { GetContentPromo } from '../action/commands/get-content-promo';
import { GetDetailJob } from '../action/commands/get-detail-job';
import { GetDpaTv } from '../action/commands/get-dpa-tv';
import { GetListJob } from '../action/commands/get-list-job';
import { getMonthlySaldo } from '../action/commands/get-monthly-saldo';
import { GetNews } from '../action/commands/get-news';
import { GetPublicAstraMagazine } from '../action/commands/get-public-astra-magazine';
import { GetPublicContentPromo } from '../action/commands/get-public-content-promo';
import { GetPublicDpaTv } from '../action/commands/get-public-dpa-tv';
import { GetPublicListJob } from '../action/commands/get-public-list-job';
import { GetPublicNews } from '../action/commands/get-public-news';
import { GetSaldo } from '../action/commands/get-saldo';
import { GetAstraHubFailed } from '../action/events/get-astra-hub-failed';
import { GetAstraHubSucceed } from '../action/events/get-astra-hub-succeed';
import { GetAstraMagazineFailed } from '../action/events/get-astra-magazine-failed';
import { GetAstraMagazineSucceed } from '../action/events/get-astra-magazine-succeed';
import { GetContentPromoFailed } from '../action/events/get-content-promo-failed';
import { GetContentPromoSucceed } from '../action/events/get-content-promo-succeed';
import { GetDetailJobFailed } from '../action/events/get-detail-job-failed';
import { GetDetailJobSucceed } from '../action/events/get-detail-job-succeed';
import { GetDpaTvFailed } from '../action/events/get-dpa-tv-failed';
import { GetDpaTvSucceed } from '../action/events/get-dpa-tv-succeed';
import { GetListJobFailed } from '../action/events/get-list-job-failed';
import { GetListJobSucceed } from '../action/events/get-list-job-succeed';
import { GetNewsFailed } from '../action/events/get-news-failed';
import { GetNewsSucceed } from '../action/events/get-news-succeed';
import { GetSaldoFailed } from '../action/events/get-saldo-failed';
import { GetSaldoSucceed } from '../action/events/get-saldo-succeed';
import { MenuService } from '../services/menu.service';
import { GetDetailContentPromo } from '../action/commands/get-detail-content-promo';
import { GetDetailContentPromoFailed } from '../action/events/get-detail-content-promo-failed';
import { GetDetailContentPromoSucceed } from '../action/events/get-detail-content-promo-succeed';
import { GetDetailNews } from '../action/commands/get-detail-news';
import { GetDetailNewsSucceed } from '../action/events/get-detail-news-succeed';
import { GetDetailNewsFailed } from '../action/events/get-detail-news-failed';
import { GetDetailAstraMagazine } from '../action/commands/get-detail-astra-magazine';
import { GetDetailAstraMagazineSucceed } from '../action/events/get-detail-astra-magazine-succeed';
import { GetDetailAstraMagazineFailed } from '../action/events/get-detail-astra-magazine-failed';
import { GetDetailDpaTv } from '../action/commands/get-detail-dpa-tv';
import { GetDetailDpaTvSucceed } from '../action/events/get-detail-dpa-tv-succeed';
import { GetDetailDpaTvFailed } from '../action/events/get-detail-dpa-tv-failed';
import { GetLaporanInvestasi } from '../action/commands/get-laporan-investasi';
import { GetLaporanInvestasiSucceed } from '../action/events/get-laporan-investasi-succeed';
import { GetLaporanInvestasiFailed } from '../action/events/get-laporan-investasi-failed';
import { GetDetailLaporanInvestasi } from '../action/commands/get-detail-laporan-investasi';
import { GetDetailLaporanInvestasiSucceed } from '../action/events/get-detail-laporan-investasi-succeed';
import { GetDetailLaporanInvestasiFailed } from '../action/events/get-detail-laporan-investasi-failed';
import { GetListPostinganRuangPensiun } from '../action/commands/get-list-postingan-ruang-pensiun';
import { GetListPostinganRuangPensiunSucceed } from '../action/events/get-list-postingan-ruang-pensiun-succeed';
import { GetListPostinganRuangPensiunFailed } from '../action/events/get-list-postingan-ruang-pensiun-failed';
import { GetDetailPostinganRuangPensiunSucceed } from '../action/events/get-detail-postingan-ruang-pensiun-succeed';
import { GetDetailPostinganRuangPensiun } from '../action/commands/get-detail-postingan-ruang-pensiun';
import { GetDetailPostinganRuangPensiunFailed } from '../action/events/get-detail-postingan-ruang-pensiun-failed';
import { GetListJualBeliRuangPensiun } from '../action/commands/get-list-jual-beli-ruang-pensiun';
import { GetListJualBeliRuangPensiunSucceed } from '../action/events/get-list-jual-beli-ruang-pensiun-succeed';
import { GetListJualBeliRuangPensiunFailed } from '../action/events/get-list-jual-beli-ruang-pensiun-failed';
import { GetDetailJualBeliRuangPensiun } from '../action/commands/get-detail-jual-beli-ruang-pensiun';
import { GetDetailJualBeliRuangPensiunSucceed } from '../action/events/get-detail-jual-beli-ruang-pensiun-succeed';
import { GetDetailJualBeliRuangPensiunFailed } from '../action/events/get-detail-jual-beli-ruang-pensiun-failed';
import { GetListKategoriRuangPensiun } from '../action/commands/get-list-kategori-ruang-pensiun';
import { GetListKategoriRuangPensiunSucceed } from '../action/events/get-list-kategori-ruang-pensiun-succeed';
import { GetListKategoriRuangPensiunFailed } from '../action/events/get-list-kategori-ruang-pensiun-failed';
import { GetFriendList } from '../action/commands/get-friend-list';
import { GetFriendListSucceed } from '../action/events/get-friend-list-succeed';
import { GetFriendListFailed } from '../action/events/get-friend-list-failed';
import { News } from '../models/news.model';
import {
  convertToParams,
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponseArray,
  DataResponsePagination,
} from '@shared';
import { GetPublicListKategoriRuangPensiun } from '../action/commands/get-public-list-kategori-ruang-pensiun';
import { GetPublicListPostinganRuangPensiun } from '../action/commands/get-public-list-postingan-ruang-pensiun';
import { GetPublicDetailPostinganRuangPensiun } from '../action/commands/get-public-detail-postingan-ruang-pensiun';
import { GetPublicListJualBeliRuangPensiun } from '../action/commands/get-public-list-jual-beli-ruang-pensiun';
import { GetPublicDetailJualBeliRuangPensiun } from '../action/commands/get-public-detail-jual-beli-ruang-pensiun';
import { InsertPostingan } from '../action/commands/insert-postingan';
import { ManagePostinganSucceed } from '../action/events/manage-postingan-succeed';
import { ManagePostinganFailed } from '../action/events/manage-postingan-failed';
import { InsertJualBeli } from '../action/commands/insert-jual-beli';
import { ManageJualBeliSucceed } from '../action/events/manage-jual-beli-succeed';
import { ManageJualBeliFailed } from '../action/events/manage-jual-beli-failed';
import { LikeContent } from '../action/commands/like-content';
import { DeletePostingan } from '../action/commands/delete-postingan';
import { DeleteJualBeli } from '../action/commands/delete-jual-beli';
import { GetListAllKontenRuangPensiun } from '../action/commands/get-list-all-konten-ruang-pensiun';
import { GetListAllKontenRuangPensiunFailed } from '../action/events/get-list-all-konten-ruang-pensiun-failed';
import { GetListAllKontenRuangPensiunSucceed } from '../action/events/get-list-all-konten-ruang-pensiun-succeed';
import { LikeAllContent } from '../action/commands/like-all-content';
import { ManageAllKontenFailed } from '../action/events/manage-all-konten-failed';
import { ManageAllKontenSucceed } from '../action/events/manage-all-konten-succeed';
import { GetPublicListAllKontenRuangPensiun } from '../action/commands/get-public-list-all-konten-ruang-pensiun';
import { GetPublicListAllKontenRuangPensiunSucceed } from '../action/events/get-public-list-all-konten-ruang-pensiun-succeed';
import { GetPublicListAllKontenRuangPensiunFailed } from '../action/events/get-public-list-all-konten-ruang-pensiun-failed';
import { GetHubDpa } from '../action/commands/get-hub-dpa';
import { GetHubDpaSucceed } from '../action/events/get-hub-dpa-succeed';
import { GetHubDpaFailed } from '../action/events/get-hub-dpa-failed';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable()
export class MenuEffect {
  constructor(private actions$: Actions, private service: MenuService) {}

  getAstraHub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAstraHub),
      mergeMap(({ async }) =>
        this.service.getAstraHub().pipe(
          map((response) => {
            return GetAstraHubSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetAstraHubFailed({ response: error }),
              ]);
            }
            return of(GetAstraHubFailed({ response: error }));
          })
        )
      )
    )
  );

  getPublicListJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListJob),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getPublicListJob(payload).pipe(
          map((response) => {
            return GetListJobSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListJobFailed({ response: error, dataType }),
              ]);
            }
            return of(GetListJobFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  getListJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListJob),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getListJob().pipe(
          map((response) => {
            return GetListJobSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListJobFailed({ response: error, dataType }),
              ]);
            }
            return of(GetListJobFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  getDetailJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailJob),
      mergeMap(({ async, payload }) =>
        this.service.getDetailJob(payload).pipe(
          map((response) => {
            return GetDetailJobSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailJobFailed({ response: error }),
              ]);
            }
            return of(GetDetailJobFailed({ response: error }));
          })
        )
      )
    )
  );

  getContentPromo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetContentPromo),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getContentPromo(payload).pipe(
          map((response) => {
            return GetContentPromoSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetContentPromoFailed({ response: error, dataType }),
              ]);
            }
            return of(GetContentPromoFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  getPublicContentPromo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicContentPromo),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getPublicContentPromo(payload).pipe(
          map((response) => {
            return GetContentPromoSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetContentPromoFailed({ response: error, dataType }),
              ]);
            }
            return of(GetContentPromoFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  getDetailContentPromo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailContentPromo),
      mergeMap(({ async, payload }) =>
        this.service.getDetailContentPromo(payload).pipe(
          map((response) => {
            return GetDetailContentPromoSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailContentPromoFailed({ response: error }),
              ]);
            }
            return of(GetDetailContentPromoFailed({ response: error }));
          })
        )
      )
    )
  );

  getNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetNews),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getNews(payload).pipe(
          map((response) => {
            return GetNewsSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetNewsFailed({ response: { ...error, data: null }, dataType }),
              ]);
            }
            return of(
              GetNewsFailed({ response: { ...error, data: null }, dataType })
            );
          })
        )
      )
    )
  );

  getPublicNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicNews),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getPublicNews(payload).pipe(
          map((response) => {
            return GetNewsSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetNewsFailed({ response: { ...error, data: null }, dataType }),
              ]);
            }
            return of(
              GetNewsFailed({ response: { ...error, data: null }, dataType })
            );
          })
        )
      )
    )
  );

  getDetailNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailNews),
      mergeMap(({ async, payload }) =>
        this.service.getDetailNews(payload).pipe(
          map((response) => {
            return GetDetailNewsSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailNewsFailed({ response: error }),
              ]);
            }
            return of(GetDetailNewsFailed({ response: error }));
          })
        )
      )
    )
  );

  getPublicAstraMagazine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicAstraMagazine),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getPublicAstraMagazine(payload).pipe(
          map((response) => {
            return GetAstraMagazineSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetAstraMagazineFailed({ response: error, dataType }),
              ]);
            }
            return of(GetAstraMagazineFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  getAstraMagazine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicAstraMagazine),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getAstraMagazine(payload).pipe(
          map((response) => {
            return GetAstraMagazineSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetAstraMagazineFailed({ response: error, dataType }),
              ]);
            }
            return of(GetAstraMagazineFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  getDetailAstraMagazine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailAstraMagazine),
      mergeMap(({ async, payload }) =>
        this.service.getDetailAstraMagazine(payload).pipe(
          map((response) => {
            return GetDetailAstraMagazineSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailAstraMagazineFailed({ response: error }),
              ]);
            }
            return of(GetDetailAstraMagazineFailed({ response: error }));
          })
        )
      )
    )
  );

  getDpaTv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDpaTv),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getDpaTv(payload).pipe(
          map((response) => {
            return GetDpaTvSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDpaTvFailed({ response: error, dataType }),
              ]);
            }
            return of(GetDpaTvFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  getPublicDpaTv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicDpaTv),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getPublicDpaTv(payload).pipe(
          map((response) => {
            return GetDpaTvSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDpaTvFailed({ response: error, dataType }),
              ]);
            }
            return of(GetDpaTvFailed({ response: error, dataType }));
          })
        )
      )
    )
  );

  getDetailDpaTv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailDpaTv),
      mergeMap(({ async, payload }) =>
        this.service.getDetailDpaTv(payload).pipe(
          map((response) => {
            return GetDetailDpaTvSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailDpaTvFailed({ response: error }),
              ]);
            }
            return of(GetDetailDpaTvFailed({ response: error }));
          })
        )
      )
    )
  );

  getSaldo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetSaldo),
      mergeMap(({ async, payload }) =>
        this.service.getSaldo(payload).pipe(
          map((response) => {
            return GetSaldoSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetSaldoFailed({ response: error }),
              ]);
            }
            return of(GetSaldoFailed({ response: error }));
          })
        )
      )
    )
  );

  getMonthlySaldo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMonthlySaldo),
      mergeMap(({ async, payload }) =>
        this.service.getMonthlySaldo(payload).pipe(
          map((response) => {
            return GetSaldoSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetSaldoFailed({ response: error }),
              ]);
            }
            return of(GetSaldoFailed({ response: error }));
          })
        )
      )
    )
  );

  getLaporanInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetLaporanInvestasi),
      mergeMap(({ async, payload }) =>
        this.service.getLaporanInvestasi(payload).pipe(
          map((response) => {
            return GetLaporanInvestasiSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetLaporanInvestasiFailed({ response: error }),
              ]);
            }
            return of(GetLaporanInvestasiFailed({ response: error }));
          })
        )
      )
    )
  );

  getDetailLaporanInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailLaporanInvestasi),
      mergeMap(({ async, payload }) =>
        this.service.getDetailLaporanInvestasi(payload).pipe(
          map((response) => {
            return GetDetailLaporanInvestasiSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailLaporanInvestasiFailed({ response: error }),
              ]);
            }
            return of(GetDetailLaporanInvestasiFailed({ response: error }));
          })
        )
      )
    )
  );

  getListKategoriRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListKategoriRuangPensiun),
      mergeMap(({ async, payload }) =>
        this.service.getListKategoriRuangPensiun(payload).pipe(
          map((response) => {
            return GetListKategoriRuangPensiunSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListKategoriRuangPensiunFailed({ response: error }),
              ]);
            }
            return of(GetListKategoriRuangPensiunFailed({ response: error }));
          })
        )
      )
    )
  );

  getListAllKontenRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListAllKontenRuangPensiun),
      mergeMap(({ async, dataType, payload }) =>
        this.service.getListAllKontenRuangPensiun(payload).pipe(
          map((response) => {
            return GetListAllKontenRuangPensiunSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListAllKontenRuangPensiunFailed({
                  response: error,
                  dataType,
                }),
              ]);
            }
            return of(
              GetListAllKontenRuangPensiunFailed({ response: error, dataType })
            );
          })
        )
      )
    )
  );

  getPublicListAllKontenRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListAllKontenRuangPensiun),
      mergeMap(({ async, payload, dataType }) =>
        this.service.getPublicListAllKontenRuangPensiun(payload).pipe(
          map((response) => {
            return GetPublicListAllKontenRuangPensiunSucceed({
              response,
              dataType,
            });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetPublicListAllKontenRuangPensiunFailed({
                  response: error,
                  dataType,
                }),
              ]);
            }
            return of(
              GetPublicListAllKontenRuangPensiunFailed({
                response: error,
                dataType,
              })
            );
          })
        )
      )
    )
  );

  getListPostinganRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListPostinganRuangPensiun),
      mergeMap(({ async, dataType, payload }) =>
        this.service.getListPostinganRuangPensiun(payload).pipe(
          map((response) => {
            return GetListPostinganRuangPensiunSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListPostinganRuangPensiunFailed({
                  response: error,
                  dataType,
                }),
              ]);
            }
            return of(
              GetListPostinganRuangPensiunFailed({ response: error, dataType })
            );
          })
        )
      )
    )
  );

  getDetailPostinganRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailPostinganRuangPensiun),
      mergeMap(({ async, payload }) =>
        this.service.getDetailPostinganRuangPensiun(payload).pipe(
          map((response) => {
            return GetDetailPostinganRuangPensiunSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailPostinganRuangPensiunFailed({ response: error }),
              ]);
            }
            return of(
              GetDetailPostinganRuangPensiunFailed({ response: error })
            );
          })
        )
      )
    )
  );

  getListJualBeliRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetListJualBeliRuangPensiun),
      mergeMap(({ async, dataType, payload }) =>
        this.service.getListJualBeliRuangPensiun(payload).pipe(
          map((response) => {
            return GetListJualBeliRuangPensiunSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListJualBeliRuangPensiunFailed({
                  response: error,
                  dataType,
                }),
              ]);
            }
            return of(
              GetListJualBeliRuangPensiunFailed({ response: error, dataType })
            );
          })
        )
      )
    )
  );

  getDetailJualBeliRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDetailJualBeliRuangPensiun),
      mergeMap(({ async, payload }) =>
        this.service.getDetailJualBeliRuangPensiun(payload).pipe(
          map((response) => {
            return GetDetailJualBeliRuangPensiunSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailJualBeliRuangPensiunFailed({ response: error }),
              ]);
            }
            return of(GetDetailJualBeliRuangPensiunFailed({ response: error }));
          })
        )
      )
    )
  );
  //

  getPublicListKategoriRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListKategoriRuangPensiun),
      mergeMap(({ async, payload }) =>
        this.service.getPublicListKategoriRuangPensiun(payload).pipe(
          map((response) => {
            return GetListKategoriRuangPensiunSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListKategoriRuangPensiunFailed({ response: error }),
              ]);
            }
            return of(GetListKategoriRuangPensiunFailed({ response: error }));
          })
        )
      )
    )
  );

  getPublicListPostinganRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListPostinganRuangPensiun),
      mergeMap(({ async, dataType, payload }) =>
        this.service.getPublicListPostinganRuangPensiun(payload).pipe(
          map((response) => {
            return GetListPostinganRuangPensiunSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListPostinganRuangPensiunFailed({
                  response: error,
                  dataType,
                }),
              ]);
            }
            return of(
              GetListPostinganRuangPensiunFailed({ response: error, dataType })
            );
          })
        )
      )
    )
  );

  getPublicDetailPostinganRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicDetailPostinganRuangPensiun),
      mergeMap(({ async, payload }) =>
        this.service.getPublicDetailPostinganRuangPensiun(payload).pipe(
          map((response) => {
            return GetDetailPostinganRuangPensiunSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailPostinganRuangPensiunFailed({ response: error }),
              ]);
            }
            return of(
              GetDetailPostinganRuangPensiunFailed({ response: error })
            );
          })
        )
      )
    )
  );

  getPublicListJualBeliRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicListJualBeliRuangPensiun),
      mergeMap(({ async, dataType, payload }) =>
        this.service.getPublicListJualBeliRuangPensiun(payload).pipe(
          map((response) => {
            return GetListJualBeliRuangPensiunSucceed({ response, dataType });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetListJualBeliRuangPensiunFailed({
                  response: error,
                  dataType,
                }),
              ]);
            }
            return of(
              GetListJualBeliRuangPensiunFailed({ response: error, dataType })
            );
          })
        )
      )
    )
  );

  getPublicDetailJualBeliRuangPensiunInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPublicDetailJualBeliRuangPensiun),
      mergeMap(({ async, payload }) =>
        this.service.getPublicDetailJualBeliRuangPensiun(payload).pipe(
          map((response) => {
            return GetDetailJualBeliRuangPensiunSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetDetailJualBeliRuangPensiunFailed({ response: error }),
              ]);
            }
            return of(GetDetailJualBeliRuangPensiunFailed({ response: error }));
          })
        )
      )
    )
  );

  getFriendListInvestasi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetFriendList),
      mergeMap(({ async, payload }) =>
        this.service.getFriendList(payload).pipe(
          map((response) => {
            return GetFriendListSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetFriendListFailed({ response: error }),
              ]);
            }
            return of(GetFriendListFailed({ response: error }));
          })
        )
      )
    )
  );

  insertPostingan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertPostingan),
      mergeMap(({ async, payload }) => {
        return this.service.insertPostingan(payload).pipe(
          map((response) => {
            return ManagePostinganSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ManagePostinganFailed({ response: error }),
              ]);
            }
            return of(ManagePostinganFailed({ response: error }));
          })
        );
      })
    )
  );

  deletePostingan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeletePostingan),
      mergeMap(({ async, payload }) => {
        return this.service.deletePostingan(payload).pipe(
          map((response) => {
            return ManagePostinganSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ManagePostinganFailed({ response: error }),
              ]);
            }
            return of(ManagePostinganFailed({ response: error }));
          })
        );
      })
    )
  );

  insertJualBeli$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertJualBeli),
      mergeMap(({ async, payload }) => {
        return this.service.insertJualBeli(payload).pipe(
          map((response) => {
            return ManageJualBeliSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ManageJualBeliFailed({ response: error }),
              ]);
            }
            return of(ManageJualBeliFailed({ response: error }));
          })
        );
      })
    )
  );

  deleteJualBeli$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteJualBeli),
      mergeMap(({ async, payload }) => {
        return this.service.deleteJualBeli(payload).pipe(
          map((response) => {
            return ManageJualBeliSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ManageJualBeliFailed({ response: error }),
              ]);
            }
            return of(ManageJualBeliFailed({ response: error }));
          })
        );
      })
    )
  );

  likeContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LikeContent),
      mergeMap(({ async, payload, dataType }) => {
        return this.service.likeContent(payload).pipe(
          map((response) => {
            if (dataType === 'jualBeliRuangPensiun') {
              return ManageJualBeliSucceed({ response });
            } else {
              return ManagePostinganSucceed({ response });
            }
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                dataType === 'jualBeliRuangPensiun'
                  ? ManageJualBeliFailed({ response: error })
                  : ManagePostinganFailed({ response: error }),
              ]);
            }
            if (dataType === 'jualBeliRuangPensiun') {
              return of(ManageJualBeliFailed({ response: error }));
            } else {
              return of(ManagePostinganFailed({ response: error }));
            }
          })
        );
      })
    )
  );

  likeAllContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LikeAllContent),
      mergeMap(({ async, payload }) => {
        return this.service.likeAllContent(payload).pipe(
          map((response) => {
            return ManageAllKontenSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                ManageAllKontenFailed({ response: error }),
              ]);
            }
            return of(ManageAllKontenFailed({ response: error }));
          })
        );
      })
    )
  );

  getHubDpa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetHubDpa),
      mergeMap(({ async, payload }) => {
        return this.service.getHubDpa(payload).pipe(
          map((response) => {
            return GetHubDpaSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetHubDpaFailed({ response: error }),
              ]);
            }

            return of(GetHubDpaFailed({ response: error }));
          })
        );
      })
    )
  );
}
