import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RecommendationListContainer } from './job-recommendation-list.container';
import {
  AppJobVacancyListWebItemModule,
  AppJobVacancyListMobileItemModule,
} from '@components/job';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import {
  MenuJobInteractionStoreModule,
  MenuJobStoreModule,
} from '@stores/menu-job';

@NgModule({
  declarations: [RecommendationListContainer],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppJobVacancyListWebItemModule,
    AppJobVacancyListMobileItemModule,

    MenuJobStoreModule,
    MenuJobInteractionStoreModule,
  ],
  exports: [RecommendationListContainer],
})
export class AppJobRecommendationListContainerModule {}
