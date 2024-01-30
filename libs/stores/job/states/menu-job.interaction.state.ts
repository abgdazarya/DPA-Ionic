import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

export interface MenuJobInteractionState {
  landing: InteractionState;
  footer: InteractionState;
  list: InteractionState;
  detail: InteractionState;
  latest: InteractionState;
  recommendation: InteractionState;
}

export const MENU_JOB_INTERACTION_INITIAL_STATE: MenuJobInteractionState = {
  landing: INITIAL_INTERACTION_STATE,
  footer: INITIAL_INTERACTION_STATE,
  list: INITIAL_INTERACTION_STATE,
  detail: INITIAL_INTERACTION_STATE,
  latest: INITIAL_INTERACTION_STATE,
  recommendation: INITIAL_INTERACTION_STATE,
};
