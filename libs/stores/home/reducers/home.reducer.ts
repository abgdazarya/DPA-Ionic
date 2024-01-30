import { HOME_ACTION_REDUCERS } from '@controllers/home';
import { createReducer } from '@ngrx/store';
import { HOME_INITIAL_STATE, HomeState } from '../states/home.state';

export const homeReducer = createReducer<HomeState>(
  HOME_INITIAL_STATE,

  ...HOME_ACTION_REDUCERS
);
