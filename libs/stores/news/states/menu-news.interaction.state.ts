import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

export interface MenuNewsInteractionState {
  landing: InteractionState;
  footer: InteractionState;
  list: InteractionState;
  detail: InteractionState;
  latest: InteractionState;
  highlight: InteractionState;
  manage: InteractionState;
}

export const MENU_NEWS_INTERACTION_INITIAL_STATE: MenuNewsInteractionState = {
  landing: INITIAL_INTERACTION_STATE,
  footer: INITIAL_INTERACTION_STATE,
  list: INITIAL_INTERACTION_STATE,
  detail: INITIAL_INTERACTION_STATE,
  latest: INITIAL_INTERACTION_STATE,
  highlight: INITIAL_INTERACTION_STATE,
  manage: INITIAL_INTERACTION_STATE,
};
