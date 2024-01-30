import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { QuizPeriodData } from '../../models/quiz-period.model';

export const GetQuizPeriodSucceed = createAction(
  'Services.Quiz.Events.GetQuizPeriodSucceed',
  props<{ response: DataResponseArray<QuizPeriodData> }>()
);

export const GetQuizPeriodSucceedActionReducer = on(
  GetQuizPeriodSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      quizPeriod: {
        ...state?.quizPeriod,
        main: {
          ...state?.quizPeriod?.main,
          ...response,
        },
      },
    };
  }
);

export const GetQuizPeriodSucceedInteractionActionReducer = on(
  GetQuizPeriodSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      quizPeriod: {
        ...state?.quizPeriod,
        main: {
          ...state?.quizPeriod?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
