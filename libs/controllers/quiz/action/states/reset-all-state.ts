import { createAction, on } from '@ngrx/store';
import { QUIZ_INITIAL_INTERACTION_STATE } from '../../../../stores/quiz/states/quiz.interaction.state';
import { QUIZ_INITIAL_STATE } from '../../../../stores/quiz/states/quiz.state';

export const ResetAllState = createAction('Services.Quiz.States.ResetAllState');

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...QUIZ_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...QUIZ_INITIAL_INTERACTION_STATE,
    };
  }
);
