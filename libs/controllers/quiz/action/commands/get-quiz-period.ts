import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { QuizPeriodDto } from '../../dtos/quiz-period.dto';

export const GetQuizPeriod = createAction(
  'Services.Quiz.Commands.GetQuizPeriod',
  props<{ payload: QuizPeriodDto; async?: boolean }>()
);

export const GetQuizPeriodReset = createAction(
  'Services.Quiz.Commands.GetQuizPeriodReset',
  props<{ response: any; async?: boolean }>()
);

export const GetQuizPeriodInteractionReset = createAction(
  'Services.Quiz.Commands.GetQuizPeriodInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetQuizPeriodActionReducer = on(
  GetQuizPeriod,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetQuizPeriodActionResetReducer = on(
  GetQuizPeriodReset,
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

export const GetQuizPeriodInteractionActionReducer = on(
  GetQuizPeriod,
  (state: any) => {
    return {
      ...state,
      rankingPoint: {
        ...state?.quizPeriod,
        main: {
          ...state?.quizPeriod?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetQuizPeriodInteractionActionResetReducer = on(
  GetQuizPeriodInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPoint: {
        ...state?.quizPeriod,
        main: {
          ...state?.quizPeriod?.main,
          ...response,
        },
      },
    };
  }
);
