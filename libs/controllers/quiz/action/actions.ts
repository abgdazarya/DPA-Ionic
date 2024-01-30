import {
  GetAllQuestionActionReducer,
  GetAllQuestionActionResetReducer,
} from './commands/get-all-question';
import {
  GetQuizPeriodActionReducer,
  GetQuizPeriodActionResetReducer,
} from './commands/get-quiz-period';
import {
  GetRankingPointActionReducer,
  GetRankingPointActionResetReducer,
} from './commands/get-ranking-point';
import { GetRankingPointHistoryActionReducer } from './commands/get-ranking-point-history';
import {
  InsertAnswerActionReducer,
  InsertAnswerActionResetReducer,
} from './commands/insert-answer';
import {
  InsertRankingActionReducer,
  InsertRankingActionResetReducer,
} from './commands/insert-ranking';
import { GetAllQuestionFailedActionReducer } from './events/get-all-question-failed';
import { GetAllQuestionSucceedActionReducer } from './events/get-all-question-succeed';
import { GetQuizPeriodFailedActionReducer } from './events/get-quiz-period-failed';
import { GetQuizPeriodSucceedActionReducer } from './events/get-quiz-period-succeed';
import { GetRankingPointFailedActionReducer } from './events/get-ranking-point-failed';
import { GetRankingPointHistoryFailedActionReducer } from './events/get-ranking-point-history-failed';
import { GetRankingPointHistorySucceedActionReducer } from './events/get-ranking-point-history-succeed';
import { GetRankingPointSucceedActionReducer } from './events/get-ranking-point-succeed';
import { InsertAnswerFailedActionReducer } from './events/insert-answer-failed';
import { InsertAnswerSucceedActionReducer } from './events/insert-answer-succeed';
import { InsertRankingFailedActionReducer } from './events/insert-ranking-failed';
import { InsertRankingSucceedActionReducer } from './events/insert-ranking-succeed';
import { ResetAllStateActionReducer } from './states/reset-all-state';

export const QUIZ_ACTION_REDUCERS = [
  GetRankingPointActionReducer,
  GetRankingPointSucceedActionReducer,
  GetRankingPointFailedActionReducer,
  GetRankingPointActionResetReducer,

  GetQuizPeriodActionReducer,
  GetQuizPeriodSucceedActionReducer,
  GetQuizPeriodFailedActionReducer,
  GetQuizPeriodActionResetReducer,

  GetAllQuestionActionReducer,
  GetAllQuestionSucceedActionReducer,
  GetAllQuestionFailedActionReducer,
  GetAllQuestionActionResetReducer,

  InsertRankingActionReducer,
  InsertRankingSucceedActionReducer,
  InsertRankingFailedActionReducer,
  InsertRankingActionResetReducer,

  InsertAnswerActionReducer,
  InsertAnswerSucceedActionReducer,
  InsertAnswerFailedActionReducer,
  InsertAnswerActionResetReducer,

  GetRankingPointHistoryActionReducer,
  GetRankingPointHistorySucceedActionReducer,
  GetRankingPointHistoryFailedActionReducer,
  GetRankingPointActionResetReducer,

  ResetAllStateActionReducer,
];
