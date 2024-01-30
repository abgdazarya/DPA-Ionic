import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { VacancyListContainer } from './job-vacancy-list.container';
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
import { VacancyListPartWebModule } from './web/module';
import { VacancyListPartMobileModule } from './mobile/module';

@NgModule({
  declarations: [VacancyListContainer],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppJobVacancyListWebItemModule,
    AppJobVacancyListMobileItemModule,

    MenuJobStoreModule,
    MenuJobInteractionStoreModule,
    VacancyListPartWebModule,
    VacancyListPartMobileModule,
  ],
  exports: [VacancyListContainer],
})
export class AppJobVacancyListContainerModule {}
