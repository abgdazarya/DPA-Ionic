import {
  GetAstraHubInteractionActionReducer,
  GetAstraHubInteractionActionResetReducer,
} from './commands/get-astra-hub';
import { GetAstraHubFailedInteractionActionReducer } from './events/get-astra-hub-failed';
import { GetAstraHubSucceedInteractionActionReducer } from './events/get-astra-hub-succeed';

import {
  GetAstraMagazineInteractionActionReducer,
  GetAstraMagazineInteractionActionResetReducer,
} from './commands/get-astra-magazine';
import { GetAstraMagazineFailedInteractionActionReducer } from './events/get-astra-magazine-failed';
import { GetAstraMagazineSucceedInteractionActionReducer } from './events/get-astra-magazine-succeed';

import {
  GetDetailAstraMagazineInteractionActionReducer,
  GetDetailAstraMagazineInteractionActionResetReducer,
} from './commands/get-detail-astra-magazine';
import { GetDetailAstraMagazineFailedInteractionActionReducer } from './events/get-detail-astra-magazine-failed';
import { GetDetailAstraMagazineSucceedInteractionActionReducer } from './events/get-detail-astra-magazine-succeed';

import {
  GetPublicAstraMagazineInteractionActionReducer,
  GetPublicAstraMagazineInteractionActionResetReducer,
} from './commands/get-public-astra-magazine';

import {
  GetContentPromoInteractionActionReducer,
  GetContentPromoInteractionActionResetReducer,
} from './commands/get-content-promo';
import { GetContentPromoFailedInteractionActionReducer } from './events/get-content-promo-failed';
import { GetContentPromoSucceedInteractionActionReducer } from './events/get-content-promo-succeed';

import {
  GetDetailContentPromoInteractionActionReducer,
  GetDetailContentPromoInteractionActionResetReducer,
} from './commands/get-detail-content-promo';
import { GetDetailContentPromoFailedInteractionActionReducer } from './events/get-detail-content-promo-failed';
import { GetDetailContentPromoSucceedInteractionActionReducer } from './events/get-detail-content-promo-succeed';

import {
  GetPublicContentPromoInteractionActionReducer,
  GetPublicContentPromoInteractionActionResetReducer,
} from './commands/get-public-content-promo';

import {
  GetDpaTvInteractionActionReducer,
  GetDpaTvInteractionActionResetReducer,
} from './commands/get-dpa-tv';
import { GetDpaTvFailedInteractionActionReducer } from './events/get-dpa-tv-failed';
import { GetDpaTvSucceedInteractionActionReducer } from './events/get-dpa-tv-succeed';

import {
  GetDetailDpaTvInteractionActionReducer,
  GetDetailDpaTvInteractionActionResetReducer,
} from './commands/get-detail-dpa-tv';
import { GetDetailDpaTvFailedInteractionActionReducer } from './events/get-detail-dpa-tv-failed';
import { GetDetailDpaTvSucceedInteractionActionReducer } from './events/get-detail-dpa-tv-succeed';

import {
  GetPublicDpaTvInteractionActionReducer,
  GetPublicDpaTvInteractionActionResetReducer,
} from './commands/get-public-dpa-tv';

import {
  GetListJobInteractionActionReducer,
  GetListJobInteractionActionResetReducer,
} from './commands/get-list-job';
import { GetListJobFailedInteractionActionReducer } from './events/get-list-job-failed';
import { GetListJobSucceedInteractionActionReducer } from './events/get-list-job-succeed';

import {
  GetDetailJobInteractionActionReducer,
  GetDetailJobInteractionActionResetReducer,
} from './commands/get-detail-job';
import { GetDetailJobFailedInteractionActionReducer } from './events/get-detail-job-failed';
import { GetDetailJobSucceedInteractionActionReducer } from './events/get-detail-job-succeed';

import {
  GetPublicListJobInteractionActionReducer,
  GetPublicListJobInteractionActionResetReducer,
} from './commands/get-public-list-job';

import {
  GetNewsInteractionActionReducer,
  GetNewsInteractionActionResetReducer,
} from './commands/get-news';
import { GetNewsFailedInteractionActionReducer } from './events/get-news-failed';
import { GetNewsSucceedInteractionActionReducer } from './events/get-news-succeed';

import {
  GetDetailNewsInteractionActionReducer,
  GetDetailNewsInteractionActionResetReducer,
} from './commands/get-detail-news';
import { GetDetailNewsFailedInteractionActionReducer } from './events/get-detail-news-failed';
import { GetDetailNewsSucceedInteractionActionReducer } from './events/get-detail-news-succeed';

import {
  GetPublicNewsInteractionActionReducer,
  GetPublicNewsInteractionActionResetReducer,
} from './commands/get-public-news';
import {
  GetSaldoInteractionActionReducer,
  GetSaldoInteractionActionResetReducer,
} from './commands/get-saldo';
import { GetSaldoSucceedInteractionActionReducer } from './events/get-saldo-succeed';
import { GetSaldoFailedInteractionActionReducer } from './events/get-saldo-failed';
import {
  getMonthlySaldoInteractionActionReducer,
  getMonthlySaldoInteractionActionResetReducer,
} from './commands/get-monthly-saldo';

import {
  GetLaporanInvestasiInteractionActionReducer,
  GetLaporanInvestasiInteractionActionResetReducer,
} from './commands/get-laporan-investasi';
import { GetLaporanInvestasiFailedInteractionActionReducer } from './events/get-laporan-investasi-failed';
import { GetLaporanInvestasiSucceedInteractionActionReducer } from './events/get-laporan-investasi-succeed';

import {
  GetDetailLaporanInvestasiInteractionActionReducer,
  GetDetailLaporanInvestasiInteractionActionResetReducer,
} from './commands/get-detail-laporan-investasi';
import { GetDetailLaporanInvestasiFailedInteractionActionReducer } from './events/get-detail-laporan-investasi-failed';
import { GetDetailLaporanInvestasiSucceedInteractionActionReducer } from './events/get-detail-laporan-investasi-succeed';

import {
  GetListKategoriRuangPensiunInteractionActionReducer,
  GetListKategoriRuangPensiunInteractionActionResetReducer,
} from './commands/get-list-kategori-ruang-pensiun';
import { GetListKategoriRuangPensiunFailedInteractionActionReducer } from './events/get-list-kategori-ruang-pensiun-failed';
import { GetListKategoriRuangPensiunSucceedInteractionActionReducer } from './events/get-list-kategori-ruang-pensiun-succeed';

import {
  GetListPostinganRuangPensiunInteractionActionReducer,
  GetListPostinganRuangPensiunInteractionActionResetReducer,
} from './commands/get-list-postingan-ruang-pensiun';
import { GetListPostinganRuangPensiunFailedInteractionActionReducer } from './events/get-list-postingan-ruang-pensiun-failed';
import { GetListPostinganRuangPensiunSucceedInteractionActionReducer } from './events/get-list-postingan-ruang-pensiun-succeed';

import {
  GetDetailPostinganRuangPensiunInteractionActionReducer,
  GetDetailPostinganRuangPensiunInteractionActionResetReducer,
} from './commands/get-detail-postingan-ruang-pensiun';
import { GetDetailPostinganRuangPensiunFailedInteractionActionReducer } from './events/get-detail-postingan-ruang-pensiun-failed';
import { GetDetailPostinganRuangPensiunSucceedInteractionActionReducer } from './events/get-detail-postingan-ruang-pensiun-succeed';

import {
  GetListJualBeliRuangPensiunInteractionActionReducer,
  GetListJualBeliRuangPensiunInteractionActionResetReducer,
} from './commands/get-list-jual-beli-ruang-pensiun';
import { GetListJualBeliRuangPensiunFailedInteractionActionReducer } from './events/get-list-jual-beli-ruang-pensiun-failed';
import { GetListJualBeliRuangPensiunSucceedInteractionActionReducer } from './events/get-list-jual-beli-ruang-pensiun-succeed';

import {
  GetDetailJualBeliRuangPensiunInteractionActionReducer,
  GetDetailJualBeliRuangPensiunInteractionActionResetReducer,
} from './commands/get-detail-jual-beli-ruang-pensiun';
import { GetDetailJualBeliRuangPensiunFailedInteractionActionReducer } from './events/get-detail-jual-beli-ruang-pensiun-failed';
import { GetDetailJualBeliRuangPensiunSucceedInteractionActionReducer } from './events/get-detail-jual-beli-ruang-pensiun-succeed';

import {
  GetFriendListInteractionActionReducer,
  GetFriendListInteractionActionResetReducer,
} from './commands/get-friend-list';
import { GetFriendListFailedInteractionActionReducer } from './events/get-friend-list-failed';
import { GetFriendListSucceedInteractionActionReducer } from './events/get-friend-list-succeed';

import {
  InsertPostinganInteractionActionReducer,
  InsertPostinganInteractionActionResetReducer,
} from './commands/insert-postingan';
import {
  EditPostinganInteractionActionReducer,
  EditPostinganInteractionActionResetReducer,
} from './commands/edit-postingan';
import {
  DeletePostinganInteractionActionReducer,
  DeletePostinganInteractionActionResetReducer,
} from './commands/delete-postingan';

import { ManagePostinganFailedInteractionActionReducer } from './events/manage-postingan-failed';
import { ManagePostinganSucceedInteractionActionReducer } from './events/manage-postingan-succeed';

import {
  InsertJualBeliInteractionActionReducer,
  InsertJualBeliInteractionActionResetReducer,
} from './commands/insert-jual-beli';
import {
  EditJualBeliInteractionActionReducer,
  EditJualBeliInteractionActionResetReducer,
} from './commands/edit-jual-beli';
import {
  DeleteJualBeliInteractionActionReducer,
  DeleteJualBeliInteractionActionResetReducer,
} from './commands/delete-jual-beli';

import { ManageJualBeliFailedInteractionActionReducer } from './events/manage-jual-beli-failed';
import { ManageJualBeliSucceedInteractionActionReducer } from './events/manage-jual-beli-succeed';
import {
  LikeContentInteractionActionReducer,
  LikeContentInteractionActionResetReducer,
} from './commands/like-content';
import {
  GetListAllKontenRuangPensiunInteractionActionReducer,
  GetListAllKontenRuangPensiunInteractionActionResetReducer,
} from './commands/get-list-all-konten-ruang-pensiun';
import { GetListAllKontenRuangPensiunFailedInteractionActionReducer } from './events/get-list-all-konten-ruang-pensiun-failed';
import { GetListAllKontenRuangPensiunSucceedInteractionActionReducer } from './events/get-list-all-konten-ruang-pensiun-succeed';
import {
  LikeAllContentInteractionActionReducer,
  LikeAllContentInteractionActionResetReducer,
} from './commands/like-all-content';
import { ManageAllKontenFailedInteractionActionReducer } from './events/manage-all-konten-failed';
import { ManageAllKontenSucceedInteractionActionReducer } from './events/manage-all-konten-succeed';
import {
  GetPublicListAllKontenRuangPensiunActionReducer,
  GetPublicListAllKontenRuangPensiunActionResetReducer,
  GetPublicListAllKontenRuangPensiunInteractionActionReducer,
} from './commands/get-public-list-all-konten-ruang-pensiun';
import { GetPublicListAllKontenRuangPensiunSucceedInteractionActionReducer } from './events/get-public-list-all-konten-ruang-pensiun-succeed';
import { GetPublicListAllKontenRuangPensiunFailedInteractionActionReducer } from './events/get-public-list-all-konten-ruang-pensiun-failed';
import {
  GetHubDpaInteractionActionReducer,
  GetHubDpaInteractionActionResetReducer,
} from './commands/get-hub-dpa';
import { GetHubDpaSucceedInteractionActionReducer } from './events/get-hub-dpa-succeed';
import { GetHubDpaFailedInteractionActionReducer } from './events/get-hub-dpa-failed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';
import { GetPublicListPostinganRuangPensiunInteractionActionReducer } from './commands/get-public-list-postingan-ruang-pensiun';
import { GetPublicListJualBeliRuangPensiunInteractionActionReducer } from './commands/get-public-list-jual-beli-ruang-pensiun';

export const MENU_INTERACTION_ACTION_REDUCERS = [
  GetPublicListJobInteractionActionReducer,
  GetPublicListJobInteractionActionResetReducer,

  GetListJobInteractionActionReducer,
  GetListJobSucceedInteractionActionReducer,
  GetListJobFailedInteractionActionReducer,
  GetListJobInteractionActionResetReducer,

  GetDetailJobInteractionActionReducer,
  GetDetailJobSucceedInteractionActionReducer,
  GetDetailJobFailedInteractionActionReducer,
  GetDetailJobInteractionActionResetReducer,

  GetPublicAstraMagazineInteractionActionReducer,
  GetPublicAstraMagazineInteractionActionResetReducer,

  GetAstraMagazineInteractionActionReducer,
  GetAstraMagazineSucceedInteractionActionReducer,
  GetAstraMagazineFailedInteractionActionReducer,
  GetAstraMagazineInteractionActionResetReducer,

  GetDetailAstraMagazineInteractionActionReducer,
  GetDetailAstraMagazineSucceedInteractionActionReducer,
  GetDetailAstraMagazineFailedInteractionActionReducer,
  GetDetailAstraMagazineInteractionActionResetReducer,

  GetPublicContentPromoInteractionActionReducer,
  GetPublicContentPromoInteractionActionResetReducer,

  GetContentPromoInteractionActionReducer,
  GetContentPromoSucceedInteractionActionReducer,
  GetContentPromoFailedInteractionActionReducer,
  GetContentPromoInteractionActionResetReducer,

  GetDetailContentPromoInteractionActionReducer,
  GetDetailContentPromoSucceedInteractionActionReducer,
  GetDetailContentPromoFailedInteractionActionReducer,
  GetDetailContentPromoInteractionActionResetReducer,

  GetPublicDpaTvInteractionActionReducer,
  GetPublicDpaTvInteractionActionResetReducer,

  GetDpaTvInteractionActionReducer,
  GetDpaTvSucceedInteractionActionReducer,
  GetDpaTvFailedInteractionActionReducer,
  GetDpaTvInteractionActionResetReducer,

  GetDetailDpaTvInteractionActionReducer,
  GetDetailDpaTvSucceedInteractionActionReducer,
  GetDetailDpaTvFailedInteractionActionReducer,
  GetDetailDpaTvInteractionActionResetReducer,

  GetAstraHubInteractionActionReducer,
  GetAstraHubSucceedInteractionActionReducer,
  GetAstraHubFailedInteractionActionReducer,
  GetAstraHubInteractionActionResetReducer,

  GetPublicNewsInteractionActionReducer,
  GetPublicNewsInteractionActionResetReducer,

  GetNewsInteractionActionReducer,
  GetNewsSucceedInteractionActionReducer,
  GetNewsFailedInteractionActionReducer,
  GetNewsInteractionActionResetReducer,

  GetDetailNewsInteractionActionReducer,
  GetDetailNewsSucceedInteractionActionReducer,
  GetDetailNewsFailedInteractionActionReducer,
  GetDetailNewsInteractionActionResetReducer,

  GetSaldoInteractionActionReducer,
  GetSaldoSucceedInteractionActionReducer,
  GetSaldoFailedInteractionActionReducer,
  GetSaldoInteractionActionResetReducer,

  getMonthlySaldoInteractionActionReducer,
  getMonthlySaldoInteractionActionResetReducer,

  GetLaporanInvestasiInteractionActionReducer,
  GetLaporanInvestasiSucceedInteractionActionReducer,
  GetLaporanInvestasiFailedInteractionActionReducer,
  GetLaporanInvestasiInteractionActionResetReducer,

  GetDetailLaporanInvestasiInteractionActionReducer,
  GetDetailLaporanInvestasiSucceedInteractionActionReducer,
  GetDetailLaporanInvestasiFailedInteractionActionReducer,
  GetDetailLaporanInvestasiInteractionActionResetReducer,

  GetListKategoriRuangPensiunInteractionActionReducer,
  GetListKategoriRuangPensiunSucceedInteractionActionReducer,
  GetListKategoriRuangPensiunFailedInteractionActionReducer,
  GetListKategoriRuangPensiunInteractionActionResetReducer,

  GetPublicListAllKontenRuangPensiunActionReducer,
  GetPublicListAllKontenRuangPensiunActionResetReducer,
  GetPublicListAllKontenRuangPensiunSucceedInteractionActionReducer,
  GetPublicListAllKontenRuangPensiunFailedInteractionActionReducer,

  GetListAllKontenRuangPensiunInteractionActionReducer,
  GetListAllKontenRuangPensiunSucceedInteractionActionReducer,
  GetListAllKontenRuangPensiunFailedInteractionActionReducer,
  GetListAllKontenRuangPensiunInteractionActionResetReducer,
  GetPublicListAllKontenRuangPensiunInteractionActionReducer,

  GetListPostinganRuangPensiunInteractionActionReducer,
  GetListPostinganRuangPensiunSucceedInteractionActionReducer,
  GetListPostinganRuangPensiunFailedInteractionActionReducer,
  GetListPostinganRuangPensiunInteractionActionResetReducer,
  GetPublicListPostinganRuangPensiunInteractionActionReducer,

  GetDetailPostinganRuangPensiunInteractionActionReducer,
  GetDetailPostinganRuangPensiunSucceedInteractionActionReducer,
  GetDetailPostinganRuangPensiunFailedInteractionActionReducer,
  GetDetailPostinganRuangPensiunInteractionActionResetReducer,

  GetListJualBeliRuangPensiunInteractionActionReducer,
  GetListJualBeliRuangPensiunSucceedInteractionActionReducer,
  GetListJualBeliRuangPensiunFailedInteractionActionReducer,
  GetListJualBeliRuangPensiunInteractionActionResetReducer,
  GetPublicListJualBeliRuangPensiunInteractionActionReducer,

  GetDetailJualBeliRuangPensiunInteractionActionReducer,
  GetDetailJualBeliRuangPensiunSucceedInteractionActionReducer,
  GetDetailJualBeliRuangPensiunFailedInteractionActionReducer,
  GetDetailJualBeliRuangPensiunInteractionActionResetReducer,

  GetFriendListInteractionActionReducer,
  GetFriendListSucceedInteractionActionReducer,
  GetFriendListFailedInteractionActionReducer,
  GetFriendListInteractionActionResetReducer,

  InsertPostinganInteractionActionReducer,
  InsertPostinganInteractionActionResetReducer,
  EditPostinganInteractionActionReducer,
  EditPostinganInteractionActionResetReducer,
  DeletePostinganInteractionActionReducer,
  DeletePostinganInteractionActionResetReducer,
  ManagePostinganSucceedInteractionActionReducer,
  ManagePostinganFailedInteractionActionReducer,

  ManageAllKontenSucceedInteractionActionReducer,
  ManageAllKontenFailedInteractionActionReducer,

  InsertJualBeliInteractionActionReducer,
  InsertJualBeliInteractionActionResetReducer,
  EditJualBeliInteractionActionReducer,
  EditJualBeliInteractionActionResetReducer,
  DeleteJualBeliInteractionActionReducer,
  DeleteJualBeliInteractionActionResetReducer,
  ManageJualBeliSucceedInteractionActionReducer,
  ManageJualBeliFailedInteractionActionReducer,

  LikeContentInteractionActionReducer,
  LikeContentInteractionActionResetReducer,
  LikeAllContentInteractionActionReducer,
  LikeAllContentInteractionActionResetReducer,

  GetHubDpaInteractionActionReducer,
  GetHubDpaSucceedInteractionActionReducer,
  GetHubDpaFailedInteractionActionReducer,
  GetHubDpaInteractionActionResetReducer,

  ResetAllStateInteractionActionReducer,
];
