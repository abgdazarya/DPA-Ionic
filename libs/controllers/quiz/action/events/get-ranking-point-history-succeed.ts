import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { QuizRanking } from '../../models/quiz-ranking.model';

export const GetRankingPointHistorySucceed = createAction(
  'Services.Quiz.Events.GetRankingPointHistorySucceed',
  props<{ response: DataResponse<QuizRanking> }>()
);

export const GetRankingPointHistorySucceedActionReducer = on(
  GetRankingPointHistorySucceed,
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

export const GetRankingPointHistorySucceedInteractionActionReducer = on(
  GetRankingPointHistorySucceed,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPointHistory: {
        ...state?.rankingPointHistory,
        main: {
          ...state?.rankingPointHistory?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
