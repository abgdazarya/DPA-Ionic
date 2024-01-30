import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { QuizEffect } from './effects/quiz.effect';
import { QuizService } from './services/quiz.service';

@NgModule({
  imports: [EffectsModule.forFeature([QuizEffect])],
  providers: [
    QuizService,
    // QuizHttpClient,
    // QuizInterceptorProvider,
  ],
})
export class QuizControllersModule {}
