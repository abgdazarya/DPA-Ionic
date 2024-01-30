import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizPage } from './quiz.page';
import { IonicModule } from '@ionic/angular';
import {
  AppCommonIconComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';
import { QuizRoutingModule } from './quiz.routing.module';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { LeaderboardCardComponent } from './components/leaderboard-card/leaderboard-card.component';
import { MulaiQuizComponent } from './components/mulai-quiz/mulai-quiz.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { QuizInteractionStoreModule, QuizStoreModule } from 'libs/stores/quiz';
import { PilihQuizModalComponent } from './components/pilih-quiz-modal/pilih-quiz-modal.component';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { LeaveQuizModalComponent } from './components/leave-quiz-modal/leave-quiz-modal.component';

@NgModule({
  declarations: [QuizPage, PilihQuizModalComponent, LeaveQuizModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    CommonHeaderComponentModule,
    HeaderSecondComponent,
    QuizRoutingModule,
    CommonFooterComponentModule,
    MulaiQuizComponent,
    LeaderboardComponent,
    AppCommonIconComponentModule,
    QuizStoreModule,
    QuizInteractionStoreModule,
    CommonAlertComponentModule,
    TransformersModule
  ],
  providers: [ProfileRepository, ProfileInteractionRepository],
})
export class QuizModule {}
