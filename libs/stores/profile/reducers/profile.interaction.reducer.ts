import { createReducer } from '@ngrx/store';
import { PROFILE_INITIAL_INTERACTION_STATE } from '../states/profile.interaction.state';
import { PROFILE_INTERACTION_ACTION_REDUCERS } from '@controllers/profile';

export const profileInteractionReducer = createReducer(
  PROFILE_INITIAL_INTERACTION_STATE,
  ...PROFILE_INTERACTION_ACTION_REDUCERS
  // Reducers module here
  // Example ...AUTH_INTERACTION_ACTION_REDUCERS from action in controllers module
);
