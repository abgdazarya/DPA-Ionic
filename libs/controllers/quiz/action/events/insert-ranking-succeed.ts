import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { InsertRankingData } from '../../models/insert-ranking.model';

export const InsertRankingSucceed = createAction(
  'Services.Quiz.Events.InsertRankingSucceed',
  props<{ response: DataResponse<InsertRankingData> }>()
);

export const InsertRankingSucceedActionReducer = on(
  InsertRankingSucceed,
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

export const InsertRankingSucceedInteractionActionReducer = on(
  InsertRankingSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      insertRanking: {
        ...state?.insertRanking,
        main: {
          ...state?.insertRanking?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
