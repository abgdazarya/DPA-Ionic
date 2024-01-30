import { createReducer } from '@ngrx/store';
import { QUIZ_INITIAL_INTERACTION_STATE } from '../states/quiz.interaction.state';
import { QUIZ_INTERACTION_ACTION_REDUCERS } from 'libs/controllers/quiz';

export const quizInteractionReducer = createReducer(
  QUIZ_INITIAL_INTERACTION_STATE,

  ...QUIZ_INTERACTION_ACTION_REDUCERS
);
