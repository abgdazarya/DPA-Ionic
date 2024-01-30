import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { InteractionState } from '@shared';
import { Observable } from 'rxjs';
import { QuizInteractionState } from '../states/quiz.interaction.state';

@Injectable()
export class QuizInteractionRepository {
  private _state = (state: any) => state.quizInteraction;
  constructor(private store: Store<QuizInteractionState>) {}

  // Repo get ranking Interaction
  public getRankingPointInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: QuizInteractionState) => state?.rankingPoint?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo get ranking Interaction
  public getQuizPeriodInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: QuizInteractionState) => state?.quizPeriod?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo get question Interaction
  public getAllQuestionInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: QuizInteractionState) => state?.question?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo insert ranking Interaction
  public insertRankingInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: QuizInteractionState) => state?.insertRanking?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo insert answer Interaction
  public insertAnswerInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: QuizInteractionState) => state?.insertAnswer?.main
    );
    return this.store.pipe(select(selector));
  }

  // Repo get ranking history Interaction
  public getRankingPointHistoryInteraction$(): Observable<InteractionState> {
    const selector = createSelector(
      this._state,
      (state: QuizInteractionState) => state?.rankingPointHistory?.main
    );
    return this.store.pipe(select(selector));
  }
}
