import { InteractionType } from '../enums/interaction-type';

export interface InteractionState {
  code: string | undefined | null;
  status: boolean | undefined | null;
  error: string | undefined | null;
  success: string | undefined | null;
  type: InteractionType;
  isLoading: boolean | undefined | null;
}

export const INITIAL_INTERACTION_STATE: InteractionState = {
  code: undefined,
  status: null,
  error: undefined,
  success: undefined,
  type: InteractionType.IDLE,
  isLoading: null,
};
