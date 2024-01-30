import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { QuestionDto } from '../../dtos/get-question.dto';

export const GetAllQuestion = createAction(
  'Services.Quiz.Commands.GetAllQuestion',
  props<{ payload: QuestionDto; async?: boolean }>()
);

export const GetAllQuestionReset = createAction(
  'Services.Quiz.Commands.GetAllQuestionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetAllQuestionInteractionReset = createAction(
  'Services.Quiz.Commands.GetAllQuestionInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetAllQuestionActionReducer = on(
  GetAllQuestion,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetAllQuestionActionResetReducer = on(
  GetAllQuestionReset,
  (state: any, { response }) => {
    return {
      ...state,
      question: {
        ...state?.question,
        main: {
          ...state?.question?.main,
          ...response,
        },
      },
    };
  }
);

export const GetAllQuestionInteractionActionReducer = on(
  GetAllQuestion,
  (state: any) => {
    return {
      ...state,
      rankingPoint: {
        ...state?.question,
        main: {
          ...state?.question?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetAllQuestionInteractionActionResetReducer = on(
  GetAllQuestionInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPoint: {
        ...state?.question,
        main: {
          ...state?.question?.main,
          ...response,
        },
      },
    };
  }
);
