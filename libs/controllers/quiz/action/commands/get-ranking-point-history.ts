import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { RangkingQuizDto } from '../../dtos/ranking-quiz.dto';

export const GetRankingPointHistory = createAction(
  'Services.Quiz.Commands.GetRankingPointHistory',
  props<{ payload: RangkingQuizDto; async?: boolean }>()
);

export const GetRankingPointHistoryReset = createAction(
  'Services.Quiz.Commands.GetRankingPointHistoryReset',
  props<{ response: any; async?: boolean }>()
);

export const GetRankingPointHistoryInteractionReset = createAction(
  'Services.Quiz.Commands.GetRankingPointHistoryInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetRankingPointHistoryActionReducer = on(
  GetRankingPointHistory,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetRankingPointHistoryActionResetReducer = on(
  GetRankingPointHistoryReset,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPointHistory: {
        ...state?.rankingPointHistory,
        main: {
          ...state?.rankingPointHistory?.main,
          ...response,
        },
      },
    };
  }
);

export const GetRankingPointHistoryHistoryInteractionActionReducer = on(
  GetRankingPointHistory,
  (state: any) => {
    return {
      ...state,
      rankingPointHistory: {
        ...state?.rankingPointHistory,
        main: {
          ...state?.rankingPointHistory?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetRankingPointHistoryHistoryInteractionActionResetReducer = on(
  GetRankingPointHistoryInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPointHistory: {
        ...state?.rankingPointHistory,
        main: {
          ...state?.rankingPointHistory?.main,
          ...response,
        },
      },
    };
  }
);
