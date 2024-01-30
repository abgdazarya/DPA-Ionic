import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { QuizFloatingButton } from './quiz-floating-button.component';
import { AppCommonIconComponentModule } from '../../icon/module';

@NgModule({
  declarations: [QuizFloatingButton],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [QuizFloatingButton],
})
export class QuizFloatingButtonModule {}
