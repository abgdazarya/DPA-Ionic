import { MENU_JOB_INTERACTION_ACTION_REDUCERS } from '@controllers/menu-job';
import { createReducer } from '@ngrx/store';
import { MENU_JOB_INTERACTION_INITIAL_STATE } from '../states/menu-job.interaction.state';

export const menuJobInteractionReducer = createReducer(
  MENU_JOB_INTERACTION_INITIAL_STATE,

  ...MENU_JOB_INTERACTION_ACTION_REDUCERS
);
