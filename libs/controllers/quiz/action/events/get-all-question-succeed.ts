import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { QuestionData } from '../../models/question.model';

export const GetAllQuestionSucceed = createAction(
  'Services.Quiz.Events.GetAllQuestionSucceed',
  props<{ response: DataResponseArray<QuestionData> }>()
);

export const GetAllQuestionSucceedActionReducer = on(
  GetAllQuestionSucceed,
  (state: any, { response }) => {
    let data = shuffleQuizAnswers(response);
    return {
      ...state,
      question: {
        ...state?.question,
        main: {
          ...state?.question?.main,
          ...data,
        },
      },
    };

    function shuffleQuizAnswers(data: any) {
      if (data.status === true) {
        const quizData = data.data.map((quiz: any) => {
          const quizCopy = { ...quiz };
          quizCopy.jawaban = shuffleArray(quiz.jawaban);
          return quizCopy;
        });

        return { ...data, data: quizData };
      } else {
        return null;
      }
    }

    function shuffleArray(array: any[]) {
      const mutableArray = array.slice();

      for (let i = mutableArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mutableArray[i], mutableArray[j]] = [mutableArray[j], mutableArray[i]];
      }
      return mutableArray;
    }
  }
);

export const GetAllQuestionSucceedInteractionActionReducer = on(
  GetAllQuestionSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      question: {
        ...state?.question,
        main: {
          ...state?.question?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
