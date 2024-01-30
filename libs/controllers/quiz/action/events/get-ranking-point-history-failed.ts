import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { QuizRanking } from '../../models/quiz-ranking.model';

export const GetRankingPointHistoryFailed = createAction(
  'Services.Quiz.Events.GetRankingPointHistoryFailed',
  props<{ response: DataResponse<QuizRanking> }>()
);

export const GetRankingPointHistoryFailedActionReducer = on(
  GetRankingPointHistoryFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetRankingPointHistoryFailedInteractionActionReducer = on(
  GetRankingPointHistoryFailed,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPointHistory: {
        ...state?.rankingPointHistory,
        main: {
          ...state?.rankingPointHistory?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
