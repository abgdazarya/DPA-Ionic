import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { GetAllQuestion } from '../action/commands/get-all-question';
import { GetQuizPeriod } from '../action/commands/get-quiz-period';
import { GetRankingPoint } from '../action/commands/get-ranking-point';
import { GetRankingPointHistory } from '../action/commands/get-ranking-point-history';
import { InsertAnswer } from '../action/commands/insert-answer';
import { InsertRanking } from '../action/commands/insert-ranking';
import { GetAllQuestionFailed } from '../action/events/get-all-question-failed';
import { GetAllQuestionSucceed } from '../action/events/get-all-question-succeed';
import { GetQuizPeriodFailed } from '../action/events/get-quiz-period-failed';
import { GetQuizPeriodSucceed } from '../action/events/get-quiz-period-succeed';
import { GetRankingPointFailed } from '../action/events/get-ranking-point-failed';
import { GetRankingPointHistoryFailed } from '../action/events/get-ranking-point-history-failed';
import { GetRankingPointHistorySucceed } from '../action/events/get-ranking-point-history-succeed';
import { GetRankingPointSucceed } from '../action/events/get-ranking-point-succeed';
import { InsertAnswerFailed } from '../action/events/insert-answer-failed';
import { InsertAnswerSucceed } from '../action/events/insert-answer-succeed';
import { InsertRankingFailed } from '../action/events/insert-ranking-failed';
import { InsertRankingSucceed } from '../action/events/insert-ranking-succeed';
import { QuizService } from '../services/quiz.service';
import { TokenResponseFailed } from 'libs/controllers/auth/action/events/token-response-failed';

@Injectable()
export class QuizEffect {
  constructor(private actions$: Actions, private service: QuizService) {}

  getQuizRankingPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetRankingPoint),
      mergeMap(({ async, payload }) =>
        this.service.getRankingPoint(payload).pipe(
          map((response) => {
            return GetRankingPointSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetRankingPointFailed({
                  response: error,
                }),
              ]);
            }
            return of(GetRankingPointFailed({ response: error }));
          })
        )
      )
    )
  );

  getQuizPeriod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetQuizPeriod),
      mergeMap(({ async, payload }) =>
        this.service.getPeriodeQuiz(payload).pipe(
          map((response) => {
            return GetQuizPeriodSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetQuizPeriodFailed({
                  response: error,
                }),
              ]);
            }
            return of(GetQuizPeriodFailed({ response: error }));
          })
        )
      )
    )
  );

  getAllQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllQuestion),
      mergeMap(({ async, payload }) =>
        this.service.getAllQuestion(payload).pipe(
          map((response) => {
            return GetAllQuestionSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetAllQuestionFailed({
                  response: error,
                }),
              ]);
            }
            return of(GetAllQuestionFailed({ response: error }));
          })
        )
      )
    )
  );

  insertRanking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertRanking),
      mergeMap(({ async, payload }) =>
        this.service.insertRankingPoint(payload).pipe(
          map((response) => {
            return InsertRankingSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                InsertRankingFailed({
                  response: error,
                }),
              ]);
            }
            return of(InsertRankingFailed({ response: error }));
          })
        )
      )
    )
  );

  insertAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertAnswer),
      mergeMap(({ async, payload }) =>
        this.service.insertAnswer(payload).pipe(
          map((response) => {
            return InsertAnswerSucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                InsertAnswerFailed({
                  response: error,
                }),
              ]);
            }
            return of(InsertAnswerFailed({ response: error }));
          })
        )
      )
    )
  );

  getRankingPointHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetRankingPointHistory),
      mergeMap(({ async, payload }) =>
        this.service.getRankingPointHistory(payload).pipe(
          map((response) => {
            return GetRankingPointHistorySucceed({ response });
          }),
          catchError(({ error }) => {
            if (error?.code == '12' || error?.code == '11') {
              return concat([
                TokenResponseFailed({
                  response: error,
                }),
                GetRankingPointHistoryFailed({
                  response: error,
                }),
              ]);
            }
            return of(GetRankingPointHistoryFailed({ response: error }));
          })
        )
      )
    )
  );
}
