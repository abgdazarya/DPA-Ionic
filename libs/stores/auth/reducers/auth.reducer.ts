import { AUTH_ACTION_REDUCERS } from '@controllers/auth';
import { createReducer } from '@ngrx/store';
import { AUTH_INITIAL_STATE, AuthState } from '../states/auth.state';

export const authReducer = createReducer<AuthState>(
  AUTH_INITIAL_STATE,

  ...AUTH_ACTION_REDUCERS
);
