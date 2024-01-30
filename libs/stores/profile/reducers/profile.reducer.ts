import { createReducer } from '@ngrx/store';
import { PROFILE_INITIAL_STATE } from '../states/profile.state';
import { PROFILE_ACTION_REDUCERS } from '@controllers/profile';

export const profileReducer = createReducer(
  PROFILE_INITIAL_STATE,
  ...PROFILE_ACTION_REDUCERS
  // Reducers module here
  // Example ...AUTH_INTERACTION_ACTION_REDUCERS from action in controllers module
);
