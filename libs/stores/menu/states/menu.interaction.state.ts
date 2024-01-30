import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

interface AstraHubState {
  main: InteractionState;
}
export interface MenuInteractionState {
  astraHub: AstraHubState;
}
interface MenuInteractionNewsState {
  landing: InteractionState;
  footer: InteractionState;
  list: InteractionState;
  detail: InteractionState;
  latest: InteractionState;
}

interface MenuInteractionJobState {
  landing: InteractionState;
  list: InteractionState;
  detail: InteractionState;
  recommendation: InteractionState;
}

interface MenuInteractionDpaTvState {
  landing: InteractionState;
  footer: InteractionState;
  list: InteractionState;
  detail: InteractionState;
}

interface MenuInteractionContentPromoState {
  landing: InteractionState;
  list: InteractionState;
  detail: InteractionState;
}

interface MenuInteractionAstraMagazineState {
  landing: InteractionState;
  list: InteractionState;
  detail: InteractionState;
}

interface MenuInteractionPrivacyPolicyState {
  landing: InteractionState;
  list: InteractionState;
}

interface SaldoInteractionState {
  main: InteractionState;
}

interface MenuInteractionLaporanInvestasiState {
  list: InteractionState;
  detail: InteractionState;
}

interface MenuInteractionKategoriRuangPensiunState {
  list: InteractionState;
}

interface MenuInteractionAllKontenRuangPensiunState {
  list: InteractionState;
  detail: InteractionState;
  manage: InteractionState;
  main: InteractionState;
}
interface MenuInteractionPostinganRuangPensiunState {
  list: InteractionState;
  detail: InteractionState;
  manage: InteractionState;
  main: InteractionState;
}

interface MenuInteractionJualBeliRuangPensiunState {
  list: InteractionState;
  detail: InteractionState;
  manage: InteractionState;
  main: InteractionState;
}

interface MenuInteractionFriendListState {
  list: InteractionState;
  detail: InteractionState;
}

interface HubDpaInteractionState {
  main: InteractionState;
}

export interface MenuInteractionState {
  astraHub: AstraHubState;
  news: MenuInteractionNewsState;
  job: MenuInteractionJobState;
  dpaTv: MenuInteractionDpaTvState;
  contentPromo: MenuInteractionContentPromoState;
  privacyPolicy: MenuInteractionPrivacyPolicyState;
  astraMagazine: MenuInteractionAstraMagazineState;
  saldo: SaldoInteractionState;
  laporanInvestasi: MenuInteractionLaporanInvestasiState;
  kategoriRuangPensiun: MenuInteractionKategoriRuangPensiunState;
  allKontenRuangPensiun: MenuInteractionAllKontenRuangPensiunState;
  postinganRuangPensiun: MenuInteractionPostinganRuangPensiunState;
  jualBeliRuangPensiun: MenuInteractionJualBeliRuangPensiunState;
  friendList: MenuInteractionFriendListState;
  hubDpa: HubDpaInteractionState;
}

export const MENU_INITIAL_INTERACTION_STATE: MenuInteractionState = {
  friendList: {
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
  },
  kategoriRuangPensiun: {
    list: INITIAL_INTERACTION_STATE,
  },
  allKontenRuangPensiun: {
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    manage: INITIAL_INTERACTION_STATE,
    main: INITIAL_INTERACTION_STATE,
  },
  postinganRuangPensiun: {
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    manage: INITIAL_INTERACTION_STATE,
    main: INITIAL_INTERACTION_STATE,
  },
  jualBeliRuangPensiun: {
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    manage: INITIAL_INTERACTION_STATE,
    main: INITIAL_INTERACTION_STATE,
  },
  laporanInvestasi: {
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
  },
  astraHub: { main: INITIAL_INTERACTION_STATE },
  news: {
    landing: INITIAL_INTERACTION_STATE,
    footer: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    latest: INITIAL_INTERACTION_STATE,
  },

  job: {
    landing: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    recommendation: INITIAL_INTERACTION_STATE,
  },

  dpaTv: {
    landing: INITIAL_INTERACTION_STATE,
    footer: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
  },

  contentPromo: {
    landing: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
  },

  privacyPolicy: {
    landing: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
  },

  astraMagazine: {
    landing: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
  },

  saldo: {
    main: INITIAL_INTERACTION_STATE,
  },

  hubDpa: { main: INITIAL_INTERACTION_STATE },
};
