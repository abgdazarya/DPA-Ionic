import { createReducer } from '@ngrx/store';
import { QUIZ_ACTION_REDUCERS } from 'libs/controllers/quiz';
import { QuizState, QUIZ_INITIAL_STATE } from '../states/quiz.state';

export const quizReducer = createReducer<QuizState>(
  QUIZ_INITIAL_STATE,

  ...QUIZ_ACTION_REDUCERS
);
