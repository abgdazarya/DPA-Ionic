import {
  GetAstraHubActionReducer,
  GetAstraHubActionResetReducer,
} from './commands/get-astra-hub';
import { GetAstraHubFailedActionReducer } from './events/get-astra-hub-failed';
import { GetAstraHubSucceedActionReducer } from './events/get-astra-hub-succeed';

import {
  GetAstraMagazineActionReducer,
  GetAstraMagazineActionResetReducer,
} from './commands/get-astra-magazine';
import { GetAstraMagazineFailedActionReducer } from './events/get-astra-magazine-failed';
import { GetAstraMagazineSucceedActionReducer } from './events/get-astra-magazine-succeed';

import {
  GetDetailAstraMagazineActionReducer,
  GetDetailAstraMagazineActionResetReducer,
} from './commands/get-detail-astra-magazine';
import { GetDetailAstraMagazineFailedActionReducer } from './events/get-detail-astra-magazine-failed';
import { GetDetailAstraMagazineSucceedActionReducer } from './events/get-detail-astra-magazine-succeed';

import {
  GetPublicAstraMagazineActionReducer,
  GetPublicAstraMagazineActionResetReducer,
} from './commands/get-public-astra-magazine';

import {
  GetContentPromoActionReducer,
  GetContentPromoActionResetReducer,
} from './commands/get-content-promo';
import { GetContentPromoFailedActionReducer } from './events/get-content-promo-failed';
import { GetContentPromoSucceedActionReducer } from './events/get-content-promo-succeed';

import {
  GetPublicContentPromoActionReducer,
  GetPublicContentPromoActionResetReducer,
} from './commands/get-public-content-promo';

import {
  GetDetailContentPromoActionReducer,
  GetDetailContentPromoActionResetReducer,
} from './commands/get-detail-content-promo';
import { GetDetailContentPromoFailedActionReducer } from './events/get-detail-content-promo-failed';
import { GetDetailContentPromoSucceedActionReducer } from './events/get-detail-content-promo-succeed';

import {
  GetDpaTvActionReducer,
  GetDpaTvActionResetReducer,
} from './commands/get-dpa-tv';
import { GetDpaTvFailedActionReducer } from './events/get-dpa-tv-failed';
import { GetDpaTvSucceedActionReducer } from './events/get-dpa-tv-succeed';

import {
  GetDetailDpaTvActionReducer,
  GetDetailDpaTvActionResetReducer,
} from './commands/get-detail-dpa-tv';
import { GetDetailDpaTvFailedActionReducer } from './events/get-detail-dpa-tv-failed';
import { GetDetailDpaTvSucceedActionReducer } from './events/get-detail-dpa-tv-succeed';

import {
  GetPublicDpaTvActionReducer,
  GetPublicDpaTvActionResetReducer,
} from './commands/get-public-dpa-tv';

import {
  GetPublicListJobActionReducer,
  GetPublicListJobActionResetReducer,
} from './commands/get-public-list-job';

import {
  GetListJobActionReducer,
  GetListJobActionResetReducer,
} from './commands/get-list-job';
import { GetListJobFailedActionReducer } from './events/get-list-job-failed';
import { GetListJobSucceedActionReducer } from './events/get-list-job-succeed';

import {
  GetDetailJobActionReducer,
  GetDetailJobActionResetReducer,
} from './commands/get-detail-job';
import { GetDetailJobFailedActionReducer } from './events/get-detail-job-failed';
import { GetDetailJobSucceedActionReducer } from './events/get-detail-job-succeed';

import {
  GetNewsActionReducer,
  GetNewsActionResetReducer,
} from './commands/get-news';
import { GetNewsFailedActionReducer } from './events/get-news-failed';
import { GetNewsSucceedActionReducer } from './events/get-news-succeed';

import {
  GetDetailNewsActionReducer,
  GetDetailNewsActionResetReducer,
} from './commands/get-detail-news';
import { GetDetailNewsFailedActionReducer } from './events/get-detail-news-failed';
import { GetDetailNewsSucceedActionReducer } from './events/get-detail-news-succeed';

import {
  GetPublicNewsActionReducer,
  GetPublicNewsActionResetReducer,
} from './commands/get-public-news';

import {
  GetSaldoActionReducer,
  GetSaldoActionResetReducer,
} from './commands/get-saldo';
import { GetSaldoFailedActionReducer } from './events/get-saldo-failed';
import { GetSaldoSucceedActionReducer } from './events/get-saldo-succeed';
import {
  getMonthlySaldoActionReducer,
  getMonthlySaldoActionResetReducer,
} from './commands/get-monthly-saldo';

import {
  GetLaporanInvestasiActionReducer,
  GetLaporanInvestasiActionResetReducer,
} from './commands/get-laporan-investasi';
import { GetLaporanInvestasiFailedActionReducer } from './events/get-laporan-investasi-failed';
import { GetLaporanInvestasiSucceedActionReducer } from './events/get-laporan-investasi-succeed';

import {
  GetDetailLaporanInvestasiActionReducer,
  GetDetailLaporanInvestasiActionResetReducer,
} from './commands/get-detail-laporan-investasi';
import { GetDetailLaporanInvestasiFailedActionReducer } from './events/get-detail-laporan-investasi-failed';
import { GetDetailLaporanInvestasiSucceedActionReducer } from './events/get-detail-laporan-investasi-succeed';

import {
  GetPublicListKategoriRuangPensiunActionReducer,
  GetPublicListKategoriRuangPensiunActionResetReducer,
} from './commands/get-public-list-kategori-ruang-pensiun';
import {
  GetListKategoriRuangPensiunActionReducer,
  GetListKategoriRuangPensiunActionResetReducer,
} from './commands/get-list-kategori-ruang-pensiun';
import { GetListKategoriRuangPensiunFailedActionReducer } from './events/get-list-kategori-ruang-pensiun-failed';
import { GetListKategoriRuangPensiunSucceedActionReducer } from './events/get-list-kategori-ruang-pensiun-succeed';

import {
  GetPublicListPostinganRuangPensiunActionReducer,
  GetPublicListPostinganRuangPensiunActionResetReducer,
} from './commands/get-public-list-postingan-ruang-pensiun';
import {
  GetListPostinganRuangPensiunActionReducer,
  GetListPostinganRuangPensiunActionResetReducer,
} from './commands/get-list-postingan-ruang-pensiun';
import { GetListPostinganRuangPensiunFailedActionReducer } from './events/get-list-postingan-ruang-pensiun-failed';
import { GetListPostinganRuangPensiunSucceedActionReducer } from './events/get-list-postingan-ruang-pensiun-succeed';

import {
  GetPublicDetailPostinganRuangPensiunActionReducer,
  GetPublicDetailPostinganRuangPensiunActionResetReducer,
} from './commands/get-public-detail-postingan-ruang-pensiun';
import {
  GetDetailPostinganRuangPensiunActionReducer,
  GetDetailPostinganRuangPensiunActionResetReducer,
} from './commands/get-detail-postingan-ruang-pensiun';
import { GetDetailPostinganRuangPensiunFailedActionReducer } from './events/get-detail-postingan-ruang-pensiun-failed';
import { GetDetailPostinganRuangPensiunSucceedActionReducer } from './events/get-detail-postingan-ruang-pensiun-succeed';

import {
  GetPublicListJualBeliRuangPensiunActionReducer,
  GetPublicListJualBeliRuangPensiunActionResetReducer,
} from './commands/get-public-list-jual-beli-ruang-pensiun';
import {
  GetListJualBeliRuangPensiunActionReducer,
  GetListJualBeliRuangPensiunActionResetReducer,
} from './commands/get-list-jual-beli-ruang-pensiun';
import { GetListJualBeliRuangPensiunFailedActionReducer } from './events/get-list-jual-beli-ruang-pensiun-failed';
import { GetListJualBeliRuangPensiunSucceedActionReducer } from './events/get-list-jual-beli-ruang-pensiun-succeed';

import {
  GetPublicDetailJualBeliRuangPensiunActionReducer,
  GetPublicDetailJualBeliRuangPensiunActionResetReducer,
} from './commands/get-public-detail-jual-beli-ruang-pensiun';
import {
  GetDetailJualBeliRuangPensiunActionReducer,
  GetDetailJualBeliRuangPensiunActionResetReducer,
} from './commands/get-detail-jual-beli-ruang-pensiun';
import { GetDetailJualBeliRuangPensiunFailedActionReducer } from './events/get-detail-jual-beli-ruang-pensiun-failed';
import { GetDetailJualBeliRuangPensiunSucceedActionReducer } from './events/get-detail-jual-beli-ruang-pensiun-succeed';

import {
  GetFriendListActionReducer,
  GetFriendListActionResetReducer,
} from './commands/get-friend-list';
import { GetFriendListFailedActionReducer } from './events/get-friend-list-failed';
import { GetFriendListSucceedActionReducer } from './events/get-friend-list-succeed';

import {
  InsertPostinganActionReducer,
  InsertPostinganActionResetReducer,
} from './commands/insert-postingan';
import {
  EditPostinganActionReducer,
  EditPostinganActionResetReducer,
} from './commands/edit-postingan';
import {
  DeletePostinganActionReducer,
  DeletePostinganActionResetReducer,
} from './commands/delete-postingan';

import { ManagePostinganFailedActionReducer } from './events/manage-postingan-failed';
import { ManagePostinganSucceedActionReducer } from './events/manage-postingan-succeed';

import {
  InsertJualBeliActionReducer,
  InsertJualBeliActionResetReducer,
} from './commands/insert-jual-beli';
import {
  EditJualBeliActionReducer,
  EditJualBeliActionResetReducer,
} from './commands/edit-jual-beli';
import {
  DeleteJualBeliActionReducer,
  DeleteJualBeliActionResetReducer,
} from './commands/delete-jual-beli';

import { ManageJualBeliFailedActionReducer } from './events/manage-jual-beli-failed';
import { ManageJualBeliSucceedActionReducer } from './events/manage-jual-beli-succeed';
import {
  LikeContentActionReducer,
  LikeContentActionResetReducer,
} from './commands/like-content';
import {
  GetListAllKontenRuangPensiunActionReducer,
  GetListAllKontenRuangPensiunActionResetReducer,
} from './commands/get-list-all-konten-ruang-pensiun';
import { GetListAllKontenRuangPensiunFailedActionReducer } from './events/get-list-all-konten-ruang-pensiun-failed';
import { GetListAllKontenRuangPensiunSucceedActionReducer } from './events/get-list-all-konten-ruang-pensiun-succeed';
import {
  GetPublicListAllKontenRuangPensiunActionReducer,
  GetPublicListAllKontenRuangPensiunActionResetReducer,
} from './commands/get-public-list-all-konten-ruang-pensiun';
import {
  LikeAllContentActionReducer,
  LikeAllContentActionResetReducer,
} from './commands/like-all-content';
import { ManageAllKontenFailedActionReducer } from './events/manage-all-konten-failed';
import { ManageAllKontenSucceedActionReducer } from './events/manage-all-konten-succeed';
import { GetPublicListAllKontenRuangPensiunSucceedActionReducer } from './events/get-public-list-all-konten-ruang-pensiun-succeed';
import { GetPublicListAllKontenRuangPensiunFailedActionReducer } from './events/get-public-list-all-konten-ruang-pensiun-failed';
import {
  GetHubDpaActionReducer,
  GetHubDpaActionResetReducer,
} from './commands/get-hub-dpa';
import { GetHubDpaFailedActionReducer } from './events/get-hub-dpa-failed';
import { GetHubDpaSucceedActionReducer } from './events/get-hub-dpa-succeed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const MENU_ACTION_REDUCERS = [
  GetPublicListJobActionReducer,
  GetPublicListJobActionResetReducer,

  GetListJobActionReducer,
  GetListJobSucceedActionReducer,
  GetListJobFailedActionReducer,
  GetListJobActionResetReducer,

  GetDetailJobActionReducer,
  GetDetailJobSucceedActionReducer,
  GetDetailJobFailedActionReducer,
  GetDetailJobActionResetReducer,

  GetPublicAstraMagazineActionReducer,
  GetPublicAstraMagazineActionResetReducer,

  GetAstraMagazineActionReducer,
  GetAstraMagazineSucceedActionReducer,
  GetAstraMagazineFailedActionReducer,
  GetAstraMagazineActionResetReducer,

  GetDetailAstraMagazineActionReducer,
  GetDetailAstraMagazineSucceedActionReducer,
  GetDetailAstraMagazineFailedActionReducer,
  GetDetailAstraMagazineActionResetReducer,

  GetPublicContentPromoActionReducer,
  GetPublicContentPromoActionResetReducer,

  GetContentPromoActionReducer,
  GetContentPromoSucceedActionReducer,
  GetContentPromoFailedActionReducer,
  GetContentPromoActionResetReducer,

  GetDetailContentPromoActionReducer,
  GetDetailContentPromoSucceedActionReducer,
  GetDetailContentPromoFailedActionReducer,
  GetDetailContentPromoActionResetReducer,

  GetPublicDpaTvActionReducer,
  GetPublicDpaTvActionResetReducer,

  GetDpaTvActionReducer,
  GetDpaTvSucceedActionReducer,
  GetDpaTvFailedActionReducer,
  GetDpaTvActionResetReducer,

  GetDetailDpaTvActionReducer,
  GetDetailDpaTvSucceedActionReducer,
  GetDetailDpaTvFailedActionReducer,
  GetDetailDpaTvActionResetReducer,

  GetAstraHubActionReducer,
  GetAstraHubSucceedActionReducer,
  GetAstraHubFailedActionReducer,
  GetAstraHubActionResetReducer,

  GetPublicNewsActionReducer,
  GetPublicNewsActionResetReducer,

  GetNewsActionReducer,
  GetNewsSucceedActionReducer,
  GetNewsFailedActionReducer,
  GetNewsActionResetReducer,

  GetDetailNewsActionReducer,
  GetDetailNewsSucceedActionReducer,
  GetDetailNewsFailedActionReducer,
  GetDetailNewsActionResetReducer,

  GetSaldoActionReducer,
  GetSaldoFailedActionReducer,
  GetSaldoSucceedActionReducer,
  GetSaldoActionResetReducer,

  getMonthlySaldoActionReducer,
  getMonthlySaldoActionResetReducer,

  GetLaporanInvestasiActionReducer,
  GetLaporanInvestasiSucceedActionReducer,
  GetLaporanInvestasiFailedActionReducer,
  GetLaporanInvestasiActionResetReducer,

  GetDetailLaporanInvestasiActionReducer,
  GetDetailLaporanInvestasiSucceedActionReducer,
  GetDetailLaporanInvestasiFailedActionReducer,
  GetDetailLaporanInvestasiActionResetReducer,

  GetLaporanInvestasiActionReducer,
  GetLaporanInvestasiSucceedActionReducer,
  GetLaporanInvestasiFailedActionReducer,
  GetLaporanInvestasiActionResetReducer,

  GetDetailLaporanInvestasiActionReducer,
  GetDetailLaporanInvestasiSucceedActionReducer,
  GetDetailLaporanInvestasiFailedActionReducer,
  GetDetailLaporanInvestasiActionResetReducer,

  GetLaporanInvestasiActionReducer,
  GetLaporanInvestasiSucceedActionReducer,
  GetLaporanInvestasiFailedActionReducer,
  GetLaporanInvestasiActionResetReducer,

  GetDetailLaporanInvestasiActionReducer,
  GetDetailLaporanInvestasiSucceedActionReducer,
  GetDetailLaporanInvestasiFailedActionReducer,
  GetDetailLaporanInvestasiActionResetReducer,

  GetPublicListKategoriRuangPensiunActionReducer,
  GetPublicListKategoriRuangPensiunActionResetReducer,
  GetListKategoriRuangPensiunActionReducer,
  GetListKategoriRuangPensiunSucceedActionReducer,
  GetListKategoriRuangPensiunFailedActionReducer,
  GetListKategoriRuangPensiunActionResetReducer,

  GetPublicListAllKontenRuangPensiunActionReducer,
  GetPublicListAllKontenRuangPensiunActionResetReducer,
  GetPublicListAllKontenRuangPensiunSucceedActionReducer,
  GetPublicListAllKontenRuangPensiunFailedActionReducer,
  GetListAllKontenRuangPensiunActionReducer,
  GetListAllKontenRuangPensiunSucceedActionReducer,
  GetListAllKontenRuangPensiunFailedActionReducer,
  GetListAllKontenRuangPensiunActionResetReducer,

  GetPublicListPostinganRuangPensiunActionReducer,
  GetPublicListPostinganRuangPensiunActionResetReducer,
  GetListPostinganRuangPensiunActionReducer,
  GetListPostinganRuangPensiunSucceedActionReducer,
  GetListPostinganRuangPensiunFailedActionReducer,
  GetListPostinganRuangPensiunActionResetReducer,

  GetPublicDetailPostinganRuangPensiunActionReducer,
  GetPublicDetailPostinganRuangPensiunActionResetReducer,
  GetDetailPostinganRuangPensiunActionReducer,
  GetDetailPostinganRuangPensiunSucceedActionReducer,
  GetDetailPostinganRuangPensiunFailedActionReducer,
  GetDetailPostinganRuangPensiunActionResetReducer,

  GetPublicListJualBeliRuangPensiunActionReducer,
  GetPublicListJualBeliRuangPensiunActionResetReducer,
  GetListJualBeliRuangPensiunActionReducer,
  GetListJualBeliRuangPensiunSucceedActionReducer,
  GetListJualBeliRuangPensiunFailedActionReducer,
  GetListJualBeliRuangPensiunActionResetReducer,

  GetPublicDetailJualBeliRuangPensiunActionReducer,
  GetPublicDetailJualBeliRuangPensiunActionResetReducer,
  GetDetailJualBeliRuangPensiunActionReducer,
  GetDetailJualBeliRuangPensiunSucceedActionReducer,
  GetDetailJualBeliRuangPensiunFailedActionReducer,
  GetDetailJualBeliRuangPensiunActionResetReducer,

  GetFriendListActionReducer,
  GetFriendListSucceedActionReducer,
  GetFriendListFailedActionReducer,
  GetFriendListActionResetReducer,

  ManageAllKontenSucceedActionReducer,
  ManageAllKontenFailedActionReducer,

  InsertPostinganActionReducer,
  InsertPostinganActionResetReducer,
  EditPostinganActionReducer,
  EditPostinganActionResetReducer,
  DeletePostinganActionReducer,
  DeletePostinganActionResetReducer,
  ManagePostinganSucceedActionReducer,
  ManagePostinganFailedActionReducer,

  InsertJualBeliActionReducer,
  InsertJualBeliActionResetReducer,
  EditJualBeliActionReducer,
  EditJualBeliActionResetReducer,
  DeleteJualBeliActionReducer,
  DeleteJualBeliActionResetReducer,
  ManageJualBeliSucceedActionReducer,
  ManageJualBeliFailedActionReducer,

  LikeContentActionReducer,
  LikeContentActionResetReducer,
  LikeAllContentActionReducer,
  LikeAllContentActionResetReducer,

  GetHubDpaActionReducer,
  GetHubDpaSucceedActionReducer,
  GetHubDpaFailedActionReducer,
  GetHubDpaActionResetReducer,

  ResetAllStateActionReducer,
];
