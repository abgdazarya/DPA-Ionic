import { INITIAL_INTERACTION_STATE, InteractionState } from '@shared';

interface RankingPoint {
  main: InteractionState;
}

interface QuizPeriodInteractionState {
  main: InteractionState;
}

interface QuestionInteractionState {
  main: InteractionState;
}

interface InsertRankingInteractionState {
  main: InteractionState;
}

interface InsertAnswerInteractionState {
  main: InteractionState;
}

interface RankingPointHistory {
  main: InteractionState;
}

export interface QuizInteractionState {
  rankingPoint: RankingPoint;
  quizPeriod: QuizPeriodInteractionState;
  question: QuestionInteractionState;
  insertRanking: InsertRankingInteractionState;
  insertAnswer: InsertAnswerInteractionState;
  rankingPointHistory: RankingPointHistory
}

export const QUIZ_INITIAL_INTERACTION_STATE: QuizInteractionState = {
  rankingPoint: { main: INITIAL_INTERACTION_STATE },
  quizPeriod: { main: INITIAL_INTERACTION_STATE },
  question: { main: INITIAL_INTERACTION_STATE },
  insertRanking: { main: INITIAL_INTERACTION_STATE },
  insertAnswer: { main: INITIAL_INTERACTION_STATE },
  rankingPointHistory: { main: INITIAL_INTERACTION_STATE },
};
