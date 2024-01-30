import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { InsertRankingData } from '../../models/insert-ranking.model';

export const InsertRankingFailed = createAction(
  'Services.Quiz.Events.InsertRankingFailed',
  props<{ response: DataResponse<InsertRankingData> }>()
);

export const InsertRankingFailedActionReducer = on(
  InsertRankingFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const InsertRankingFailedInteractionActionReducer = on(
  InsertRankingFailed,
  (state: any, { response }) => {
    return {
      ...state,
      insertRanking: {
        ...state?.insertRanking,
        main: {
          ...state?.insertRanking?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
