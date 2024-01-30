import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { InsertAnswerDto } from '../../dtos/insert-answer.dto';

export const InsertAnswer = createAction(
  'Services.Quiz.Commands.InsertAnswer',
  props<{ payload: InsertAnswerDto; async?: boolean }>()
);

export const InsertAnswerReset = createAction(
  'Services.Quiz.Commands.InsertAnswerReset',
  props<{ response: any; async?: boolean }>()
);

export const InsertAnswerInteractionReset = createAction(
  'Services.Quiz.Commands.InsertAnswerInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const InsertAnswerActionReducer = on(InsertAnswer, (state: any) => {
  return {
    ...state,
  };
});

export const InsertAnswerActionResetReducer = on(
  InsertAnswerReset,
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

export const InsertAnswerInteractionActionReducer = on(InsertAnswer, (state: any) => {
  return {
    ...state,
    insertAnswer: {
      ...state?.insertAnswer,
      main: {
        ...state?.insertAnswer?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const InsertAnswerInteractionActionResetReducer = on(
  InsertAnswerInteractionReset,
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
