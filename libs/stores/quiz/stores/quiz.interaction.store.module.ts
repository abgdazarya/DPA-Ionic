import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { quizInteractionReducer } from '../reducers/quiz.interaction.reducer';
import { QuizControllersModule } from 'libs/controllers/quiz';

@NgModule({
  imports: [
    CommonModule,
    QuizControllersModule,
    StoreModule.forFeature('quizInteraction', quizInteractionReducer),
  ],
})
export class QuizInteractionStoreModule {}
