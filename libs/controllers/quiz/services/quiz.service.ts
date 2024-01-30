import { Injectable } from '@angular/core';
import { QuizHttpClient } from '@clients';
import { DataResponse, convertToParams, DataResponseArray } from '@shared';
import { assignToArrayResponse, assignToDataResponse } from '@transformer';
import { Observable } from 'rxjs';
import { QuestionDto } from '../dtos/get-question.dto';
import { InsertAnswerDto } from '../dtos/insert-answer.dto';
import { InsertRankingDto } from '../dtos/insert-ranking.dto';
import { QuizPeriodDto } from '../dtos/quiz-period.dto';
import { RangkingQuizDto } from '../dtos/ranking-quiz.dto';
import { InsertAnswerData } from '../models/insert-answer.model';
import { InsertRankingData } from '../models/insert-ranking.model';
import { QuestionData } from '../models/question.model';
import { QuizPeriodData } from '../models/quiz-period.model';
import { QuizRanking } from '../models/quiz-ranking.model';

@Injectable()
export class QuizService {
  constructor(private client: QuizHttpClient) {}

  getRankingPoint(
    payload: RangkingQuizDto
  ): Observable<DataResponse<QuizRanking>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-ranking-point-start', { params })
      .pipe(assignToDataResponse(QuizRanking));
  }

  getPeriodeQuiz(
    payload: QuizPeriodDto
  ): Observable<DataResponseArray<QuizPeriodData>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-periode-quiz', { params })
      .pipe(assignToArrayResponse(QuizPeriodData));
  }

  getAllQuestion(
    payload: QuestionDto
  ): Observable<DataResponseArray<QuestionData>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-all-question', { params })
      .pipe(assignToArrayResponse(QuestionData));
  }

  insertAnswer(
    payload: InsertAnswerDto
  ): Observable<DataResponse<InsertAnswerData>> {
    return this.client
      .post('insert-answer', payload)
      .pipe(assignToDataResponse(InsertAnswerData));
  }

  insertRankingPoint(
    payload: InsertRankingDto
  ): Observable<DataResponse<InsertRankingData>> {
    return this.client
      .post('insert-ranking-point', payload)
      .pipe(assignToDataResponse(InsertRankingData));
  }

  getRankingPointHistory(
    payload: RangkingQuizDto
  ): Observable<DataResponse<QuizRanking>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-ranking-point-history', { params })
      .pipe(assignToDataResponse(QuizRanking));
  }
}
