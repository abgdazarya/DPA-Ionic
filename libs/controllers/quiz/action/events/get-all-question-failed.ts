import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { QuestionData } from '../../models/question.model';

export const GetAllQuestionFailed = createAction(
  'Services.Quiz.Events.GetAllQuestionFailed',
  props<{ response: DataResponseArray<QuestionData> }>()
);

export const GetAllQuestionFailedActionReducer = on(
  GetAllQuestionFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetAllQuestionFailedInteractionActionReducer = on(
  GetAllQuestionFailed,
  (state: any, { response }) => {
    return {
      ...state,
      question: {
        ...state?.question,
        main: {
          ...state?.question?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
