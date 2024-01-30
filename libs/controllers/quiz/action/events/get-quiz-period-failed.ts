import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { QuizPeriodData } from '../../models/quiz-period.model';
export const GetQuizPeriodFailed = createAction(
  'Services.Quiz.Events.GetQuizPeriodFailed',
  props<{ response: DataResponseArray<QuizPeriodData> }>()
);

export const GetQuizPeriodFailedActionReducer = on(
  GetQuizPeriodFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetQuizPeriodFailedInteractionActionReducer = on(
  GetQuizPeriodFailed,
  (state: any, { response }) => {
    return {
      ...state,
      quizPeriod: {
        ...state?.quizPeriod,
        main: {
          ...state?.quizPeriod?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
