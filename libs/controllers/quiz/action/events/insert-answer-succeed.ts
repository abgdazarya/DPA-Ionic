import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { InsertAnswerData } from '../../models/insert-answer.model';

export const InsertAnswerSucceed = createAction(
  'Services.Quiz.Events.InsertAnswerSucceed',
  props<{ response: DataResponse<InsertAnswerData> }>()
);

export const InsertAnswerSucceedActionReducer = on(
  InsertAnswerSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      insertAnswer: {
        ...state?.insertAnswer,
        main: {
          ...state?.insertAnswer?.main,
          ...response,
        },
      },
    };
  }
);

export const InsertAnswerSucceedInteractionActionReducer = on(
  InsertAnswerSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      insertAnswer: {
        ...state?.insertAnswer,
        main: {
          ...state?.insertAnswer?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
