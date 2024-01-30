import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { QuizControllersModule } from 'libs/controllers/quiz';
import { quizReducer } from '../reducers/quiz.reducer';

@NgModule({
  imports: [QuizControllersModule, StoreModule.forFeature('quiz', quizReducer)],
})
export class QuizStoreModule {}
