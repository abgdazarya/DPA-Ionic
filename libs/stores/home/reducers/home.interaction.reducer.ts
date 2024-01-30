import { createReducer } from '@ngrx/store';
import { HOME_INITIAL_INTERACTION_STATE } from '../states/home.interaction.state';
import { HOME_INTERACTION_ACTION_REDUCERS } from '@controllers/home';

export const homeInteractionReducer = createReducer(
  HOME_INITIAL_INTERACTION_STATE,

  ...HOME_INTERACTION_ACTION_REDUCERS
);
