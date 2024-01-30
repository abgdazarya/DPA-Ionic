import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { QuizRanking } from '../../models/quiz-ranking.model';

export const GetRankingPointSucceed = createAction(
  'Services.Quiz.Events.GetRankingPointSucceed',
  props<{ response: DataResponse<QuizRanking> }>()
);

export const GetRankingPointSucceedActionReducer = on(
  GetRankingPointSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPoint: {
        ...state?.rankingPoint,
        main: {
          ...state?.rankingPoint?.main,
          ...response,
        },
      },
    };
  }
);

export const GetRankingPointSucceedInteractionActionReducer = on(
  GetRankingPointSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      rankingPoint: {
        ...state?.rankingPoint,
        main: {
          ...state?.rankingPoint?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
