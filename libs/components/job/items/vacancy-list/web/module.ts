import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { JobVacancyListWebItem } from './job-vacancy-list-web.item';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';

@NgModule({
  declarations: [JobVacancyListWebItem],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [JobVacancyListWebItem],
})
export class AppJobVacancyListWebItemModule {}
