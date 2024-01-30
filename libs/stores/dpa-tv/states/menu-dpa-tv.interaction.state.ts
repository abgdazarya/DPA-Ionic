import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

export interface MenuDpaTvInteractionState {
  landing: InteractionState;
  footer: InteractionState;
  list: InteractionState;
  detail: InteractionState;
  latest: InteractionState;
}

export const MENU_DPA_TV_INTERACTION_INITIAL_STATE: MenuDpaTvInteractionState =
  {
    landing: INITIAL_INTERACTION_STATE,
    footer: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    latest: INITIAL_INTERACTION_STATE,
  };
