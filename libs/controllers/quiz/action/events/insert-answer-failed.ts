import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { InsertAnswerData } from '../../models/insert-answer.model';

export const InsertAnswerFailed = createAction(
  'Services.Quiz.Events.InsertAnswerFailed',
  props<{ response: DataResponse<InsertAnswerData> }>()
);

export const InsertAnswerFailedActionReducer = on(
  InsertAnswerFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const InsertAnswerFailedInteractionActionReducer = on(
  InsertAnswerFailed,
  (state: any, { response }) => {
    return {
      ...state,
      insertAnswer: {
        ...state?.insertAnswer,
        main: {
          ...state?.insertAnswer?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
