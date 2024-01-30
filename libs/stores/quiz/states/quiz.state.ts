import { Popup, UserInfo } from '@controllers/home';
import { DATA_RESPONSE_INITIAL_STATE, DataResponse, DataResponseArray } from '@shared';
import { InsertRankingData, QuestionData, QuizPeriodData, QuizRanking } from 'libs/controllers/quiz';

interface QuizRankingState {
  main: DataResponse<QuizRanking> | undefined | null;
}

interface QuizPeriodState {
  main: DataResponseArray<QuizPeriodData> | undefined | null;
}

interface QuestionState {
  main: DataResponseArray<QuestionData> | undefined | null;
}


interface InsertRankingState {
  main: DataResponse<InsertRankingData> | undefined | null;
}

interface InsertAnswerState {
  main: DataResponse<InsertRankingData> | undefined | null;
}

interface QuizRankingHistoryState {
  main: DataResponse<QuizRanking> | undefined | null;
}
export interface QuizState {
  rankingPoint: QuizRankingState;
  quizPeriod: QuizPeriodState;
  question: QuestionState;
  insertRanking: InsertRankingState;
  insertAnswer: InsertAnswerState;
  rankingPointHistory: QuizRankingHistoryState;
}

export const QUIZ_INITIAL_STATE: QuizState = {
  rankingPoint: { main: DATA_RESPONSE_INITIAL_STATE },
  quizPeriod: { main: DATA_RESPONSE_INITIAL_STATE },
  question: { main: DATA_RESPONSE_INITIAL_STATE },
  insertRanking: { main: DATA_RESPONSE_INITIAL_STATE },
  insertAnswer: { main: DATA_RESPONSE_INITIAL_STATE },
  rankingPointHistory: { main: DATA_RESPONSE_INITIAL_STATE },
};
