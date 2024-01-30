import { MENU_JOB_ACTION_REDUCERS } from '@controllers/menu-job';
import { createReducer } from '@ngrx/store';
import { MENU_JOB_INITIAL_STATE, MenuJobState } from '../states/menu-job.state';

export const menuJobReducer = createReducer<MenuJobState>(
  MENU_JOB_INITIAL_STATE,

  ...MENU_JOB_ACTION_REDUCERS
);
