import { Injectable } from '@angular/core';
import { Popup, UserInfo } from '@controllers/home';
import { Store, createSelector, select } from '@ngrx/store';
import { DataResponse, DataResponseArray } from '@shared';
import { InsertAnswerData, InsertRankingData, QuestionData, QuizPeriodData, QuizRanking } from 'libs/controllers/quiz';
import { Observable } from 'rxjs';
import { QuizState } from '../states/quiz.state';

@Injectable()
export class QuizRepository {
  private _state = (state: any) => state.quiz;
  constructor(private store: Store<QuizState>) {}

  // Repo Get Ranking
  public getRankingPoint$(): Observable<DataResponse<QuizRanking> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: QuizState) => state?.rankingPoint?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Quiz Period
  public getQuizPeriod$(): Observable<DataResponseArray<QuizPeriodData> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: QuizState) => state?.quizPeriod?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Get Quiz Question
  public getAllQuestion$(): Observable<DataResponseArray<QuestionData> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: QuizState) => state?.question?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Insert Ranking
  public insertRanking$(): Observable<DataResponse<InsertRankingData> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: QuizState) => state?.insertRanking?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo Insert Answer
  public insertAnswer$(): Observable<DataResponse<InsertAnswerData> | undefined | null> {
    const selector = createSelector(
      this._state,
      (state: QuizState) => state?.insertAnswer?.main
    );
    return this.store.pipe(select(selector));
  }

    // Repo Get Ranking History
    public getRankingPointHistory$(): Observable<DataResponse<QuizRanking> | undefined | null> {
      const selector = createSelector(
        this._state,
        (state: QuizState) => state?.rankingPointHistory?.main
      );
      return this.store.pipe(select(selector));
    }
}


