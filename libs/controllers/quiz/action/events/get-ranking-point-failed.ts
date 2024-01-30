import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { QuizRanking } from '../../models/quiz-ranking.model';

export const GetRankingPointFailed = createAction(
  'Services.Quiz.Events.GetRankingPointFailed',
  props<{ response: DataResponse<QuizRanking> }>()
);

export const GetRankingPointFailedActionReducer = on(
  GetRankingPointFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetRankingPointFailedInteractionActionReducer = on(
  GetRankingPointFailed,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPoint: {
        ...state?.rankingPoint,
        main: {
          ...state?.rankingPoint?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
