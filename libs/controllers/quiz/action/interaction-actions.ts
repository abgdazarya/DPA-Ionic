import {
  GetAllQuestionInteractionActionReducer,
  GetAllQuestionInteractionActionResetReducer,
} from './commands/get-all-question';
import {
  GetQuizPeriodInteractionActionReducer,
  GetQuizPeriodInteractionActionResetReducer,
} from './commands/get-quiz-period';
import {
  GetRankingPointActionResetReducer,
  GetRankingPointInteractionActionReducer,
  GetRankingPointInteractionActionResetReducer,
} from './commands/get-ranking-point';
import {
  GetRankingPointHistoryHistoryInteractionActionReducer,
  GetRankingPointHistoryHistoryInteractionActionResetReducer,
  GetRankingPointHistoryInteractionReset,
} from './commands/get-ranking-point-history';
import {
  InsertAnswerInteractionActionReducer,
  InsertAnswerInteractionActionResetReducer,
} from './commands/insert-answer';
import {
  InsertRankingInteractionActionReducer,
  InsertRankingInteractionActionResetReducer,
} from './commands/insert-ranking';
import { GetAllQuestionFailedInteractionActionReducer } from './events/get-all-question-failed';
import { GetAllQuestionSucceedInteractionActionReducer } from './events/get-all-question-succeed';
import { GetQuizPeriodFailedInteractionActionReducer } from './events/get-quiz-period-failed';
import { GetQuizPeriodSucceedInteractionActionReducer } from './events/get-quiz-period-succeed';
import { GetRankingPointFailedInteractionActionReducer } from './events/get-ranking-point-failed';
import { GetRankingPointHistoryFailedInteractionActionReducer } from './events/get-ranking-point-history-failed';
import { GetRankingPointHistorySucceedInteractionActionReducer } from './events/get-ranking-point-history-succeed';
import { GetRankingPointSucceedInteractionActionReducer } from './events/get-ranking-point-succeed';
import { InsertAnswerFailedInteractionActionReducer } from './events/insert-answer-failed';
import { InsertAnswerSucceedInteractionActionReducer } from './events/insert-answer-succeed';
import { InsertRankingFailedInteractionActionReducer } from './events/insert-ranking-failed';
import { InsertRankingSucceedInteractionActionReducer } from './events/insert-ranking-succeed';
import { ResetAllStateInteractionActionReducer } from './states/reset-all-state';

export const QUIZ_INTERACTION_ACTION_REDUCERS = [
  GetRankingPointInteractionActionReducer,
  GetRankingPointSucceedInteractionActionReducer,
  GetRankingPointFailedInteractionActionReducer,
  GetRankingPointInteractionActionResetReducer,

  GetQuizPeriodInteractionActionReducer,
  GetQuizPeriodSucceedInteractionActionReducer,
  GetQuizPeriodFailedInteractionActionReducer,
  GetQuizPeriodInteractionActionResetReducer,

  GetAllQuestionInteractionActionReducer,
  GetAllQuestionSucceedInteractionActionReducer,
  GetAllQuestionFailedInteractionActionReducer,
  GetAllQuestionInteractionActionResetReducer,

  InsertAnswerInteractionActionReducer,
  InsertAnswerSucceedInteractionActionReducer,
  InsertAnswerFailedInteractionActionReducer,
  InsertAnswerInteractionActionResetReducer,

  InsertRankingInteractionActionReducer,
  InsertRankingSucceedInteractionActionReducer,
  InsertRankingFailedInteractionActionReducer,
  InsertRankingInteractionActionResetReducer,

  GetRankingPointHistoryHistoryInteractionActionReducer,
  GetRankingPointHistorySucceedInteractionActionReducer,
  GetRankingPointHistoryFailedInteractionActionReducer,
  GetRankingPointHistoryHistoryInteractionActionResetReducer,

  ResetAllStateInteractionActionReducer,
];
