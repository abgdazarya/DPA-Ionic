import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { RangkingQuizDto } from '../../dtos/ranking-quiz.dto';

export const GetRankingPoint = createAction(
  'Services.Quiz.Commands.GetRankingPoint',
  props<{ payload: RangkingQuizDto; async?: boolean }>()
);

export const GetRankingPointReset = createAction(
  'Services.Quiz.Commands.GetRankingPointReset',
  props<{ response: any; async?: boolean }>()
);

export const GetRankingPointInteractionReset = createAction(
  'Services.Quiz.Commands.GetRankingPointInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetRankingPointActionReducer = on(
  GetRankingPoint,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetRankingPointActionResetReducer = on(
  GetRankingPointReset,
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

export const GetRankingPointInteractionActionReducer = on(
  GetRankingPoint,
  (state: any) => {
    return {
      ...state,
      rankingPoint: {
        ...state?.rankingPoint,
        main: {
          ...state?.rankingPoint?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetRankingPointInteractionActionResetReducer = on(
  GetRankingPointInteractionReset,
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
