import {
  DataResponse,
  DataResponsePagination,
  DATA_RESPONSE_INITIAL_STATE,
  DataResponseArray,
} from '@shared';
import {
  DpaTv,
  Job,
  News,
  PrivacyPolicy,
  AstraHubData,
  SaldoData,
  LaporanInvestasi,
  JualBeliRuangPensiun,
  FriendList,
  AllKontenRuangPensiun,
  HubDpaModel,
} from '@controllers/menu';
import { KategoriRuangPensiun } from 'libs/controllers/menu/models/kategori-ruang-pensiun.model';
import { PostinganRuangPensiun } from 'libs/controllers/menu/models/postingan-ruang-pensiun.model';
import { LinkData } from '@controllers/profile';

interface MenuNewsState {
  landing: DataResponsePagination<News> | undefined | null;
  footer: DataResponsePagination<News> | undefined | null;
  list: DataResponsePagination<News> | undefined | null;
  detail: DataResponse<News> | undefined | null;
  latest: DataResponsePagination<News> | undefined | null;
}

interface MenuJobState {
  landing: DataResponsePagination<Job> | undefined | null;
  list: DataResponsePagination<Job> | undefined | null;
  detail: DataResponse<Job> | undefined | null;
  recommendation: DataResponsePagination<Job> | undefined | null;
}

interface MenuDpaTvState {
  landing: DataResponsePagination<DpaTv> | undefined | null;
  footer: DataResponsePagination<DpaTv> | undefined | null;
  list: DataResponsePagination<DpaTv> | undefined | null;
  detail: DataResponse<DpaTv> | undefined | null;
}

interface MenuContentPromoState {
  landing: DataResponsePagination<any> | undefined | null;
  list: DataResponsePagination<any> | undefined | null;
  detail: DataResponse<any> | undefined | null;
}

interface MenuAstraMagazineState {
  landing: DataResponsePagination<News> | undefined | null;
  list: DataResponsePagination<News> | undefined | null;
  detail: DataResponse<News> | undefined | null;
}

interface MenuPrivacyPolicyState {
  landing: DataResponsePagination<PrivacyPolicy> | undefined | null;
  list: DataResponsePagination<PrivacyPolicy> | undefined | null;
}

interface MenuLaporanInvestasiState {
  list: DataResponseArray<LaporanInvestasi> | undefined | null;
  detail: DataResponse<LaporanInvestasi> | undefined | null;
}

interface MenuKategoriRuangPensiunState {
  list: DataResponsePagination<KategoriRuangPensiun> | undefined | null;
}

interface MenuAllKontenRuangPensiunState {
  list: DataResponsePagination<AllKontenRuangPensiun> | undefined | null;
  detail: DataResponse<AllKontenRuangPensiun> | undefined | null;
  manage: DataResponse<AllKontenRuangPensiun> | undefined | null;
}

interface MenuPostinganRuangPensiunState {
  list: DataResponsePagination<PostinganRuangPensiun> | undefined | null;
  detail: DataResponse<PostinganRuangPensiun> | undefined | null;
  manage: DataResponse<PostinganRuangPensiun> | undefined | null;
}

interface MenuJualBeliRuangPensiunState {
  list: DataResponsePagination<JualBeliRuangPensiun> | undefined | null;
  detail: DataResponse<JualBeliRuangPensiun> | undefined | null;
  manage: DataResponse<JualBeliRuangPensiun> | undefined | null;
}

interface AstraHubState {
  main: DataResponseArray<AstraHubData> | undefined | null;
}

interface MenuFriendListState {
  list: DataResponsePagination<FriendList> | undefined | null;
  detail: DataResponse<FriendList> | undefined | null;
}

interface HubDpaState {
  main: DataResponseArray<HubDpaModel> | undefined | null;
}

export interface MenuState {
  astraHub: AstraHubState;
  news: MenuNewsState;
  job: MenuJobState;
  dpaTv: MenuDpaTvState;
  contentPromo: MenuContentPromoState;
  privacyPolicy: MenuPrivacyPolicyState;
  astraMagazine: MenuAstraMagazineState;
  saldo: SaldoState;
  laporanInvestasi: MenuLaporanInvestasiState;
  kategoriRuangPensiun: MenuKategoriRuangPensiunState;
  allKontenRuangPensiun: MenuAllKontenRuangPensiunState;
  postinganRuangPensiun: MenuPostinganRuangPensiunState;
  jualBeliRuangPensiun: MenuJualBeliRuangPensiunState;
  friendList: MenuFriendListState;
  hubDpa: HubDpaState;
}

interface SaldoState {
  main: DataResponse<SaldoData> | undefined | null;
}

export const MENU_INITIAL_STATE: MenuState = {
  friendList: {
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
  },
  kategoriRuangPensiun: {
    list: DATA_RESPONSE_INITIAL_STATE,
  },
  allKontenRuangPensiun: {
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
    manage: DATA_RESPONSE_INITIAL_STATE,
  },
  postinganRuangPensiun: {
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
    manage: DATA_RESPONSE_INITIAL_STATE,
  },
  jualBeliRuangPensiun: {
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
    manage: DATA_RESPONSE_INITIAL_STATE,
  },
  laporanInvestasi: {
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
  },
  astraHub: { main: DATA_RESPONSE_INITIAL_STATE },
  news: {
    landing: DATA_RESPONSE_INITIAL_STATE,
    footer: DATA_RESPONSE_INITIAL_STATE,
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
    latest: DATA_RESPONSE_INITIAL_STATE,
  },

  job: {
    landing: DATA_RESPONSE_INITIAL_STATE,
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
    recommendation: DATA_RESPONSE_INITIAL_STATE,
  },

  dpaTv: {
    landing: DATA_RESPONSE_INITIAL_STATE,
    footer: DATA_RESPONSE_INITIAL_STATE,
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
  },

  contentPromo: {
    landing: DATA_RESPONSE_INITIAL_STATE,
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
  },

  privacyPolicy: {
    landing: DATA_RESPONSE_INITIAL_STATE,
    list: DATA_RESPONSE_INITIAL_STATE,
  },

  astraMagazine: {
    landing: DATA_RESPONSE_INITIAL_STATE,
    list: DATA_RESPONSE_INITIAL_STATE,
    detail: DATA_RESPONSE_INITIAL_STATE,
  },
  saldo: { main: DATA_RESPONSE_INITIAL_STATE },
  hubDpa: { main: DATA_RESPONSE_INITIAL_STATE },
};
