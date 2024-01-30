import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

export interface MenuAstramagazineInteractionState {
  landing: InteractionState;
  footer: InteractionState;
  list: InteractionState;
  detail: InteractionState;
  latest: InteractionState;
  option: InteractionState;
}

export const MENU_ASTRAMAGAZINE_INTERACTION_INITIAL_STATE: MenuAstramagazineInteractionState =
  {
    landing: INITIAL_INTERACTION_STATE,
    footer: INITIAL_INTERACTION_STATE,
    list: INITIAL_INTERACTION_STATE,
    detail: INITIAL_INTERACTION_STATE,
    latest: INITIAL_INTERACTION_STATE,
    option: INITIAL_INTERACTION_STATE,
  };
