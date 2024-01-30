import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { InsertRankingDto } from '../../dtos/insert-ranking.dto';

export const InsertRanking = createAction(
  'Services.Quiz.Commands.InsertRanking',
  props<{ payload: InsertRankingDto; async?: boolean }>()
);

export const InsertRankingReset = createAction(
  'Services.Quiz.Commands.InsertRankingReset',
  props<{ response: any; async?: boolean }>()
);

export const InsertRankingInteractionReset = createAction(
  'Services.Quiz.Commands.InsertRankingInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const InsertRankingActionReducer = on(InsertRanking, (state: any) => {
  return {
    ...state,
  };
});

export const InsertRankingActionResetReducer = on(
  InsertRankingReset,
  (state: any, { response }) => {
    return {
      ...state,
      insertRanking: {
        ...state?.insertRanking,
        main: {
          ...state?.insertRanking?.main,
          ...response,
        },
      },
    };
  }
);

export const InsertRankingInteractionActionReducer = on(InsertRanking, (state: any) => {
  return {
    ...state,
    insertRanking: {
      ...state?.insertRanking,
      main: {
        ...state?.insertRanking?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const InsertRankingInteractionActionResetReducer = on(
  InsertRankingInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      insertRanking: {
        ...state?.insertRanking,
        main: {
          ...state?.insertRanking?.main,
          ...response,
        },
      },
    };
  }
);
