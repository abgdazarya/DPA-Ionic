import { createReducer } from '@ngrx/store';
import { AUTH_INITIAL_INTERACTION_STATE } from '../states/auth.interaction.state';
import { AUTH_INTERACTION_ACTION_REDUCERS } from '@controllers/auth';

export const authInteractionReducer = createReducer(
  AUTH_INITIAL_INTERACTION_STATE,

  ...AUTH_INTERACTION_ACTION_REDUCERS
);
