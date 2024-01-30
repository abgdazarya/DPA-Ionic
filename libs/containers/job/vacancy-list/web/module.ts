import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
import { VacancyListPartWeb } from './job-vacancy-list.part';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';

@NgModule({
  declarations: [VacancyListPartWeb],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,
    TransformersModule,

    AppJobVacancyListWebItemModule,
    AppJobVacancyListMobileItemModule,

    MenuJobStoreModule,
    MenuJobInteractionStoreModule,
  ],
  exports: [VacancyListPartWeb],
})
export class VacancyListPartWebModule {}
