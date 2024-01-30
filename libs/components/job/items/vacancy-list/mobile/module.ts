import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { JobVacancyListMobileItem } from './job-vacancy-list-mobile.item';
import {
  AppCommonButtonComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';

@NgModule({
  declarations: [JobVacancyListMobileItem],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [JobVacancyListMobileItem],
})
export class AppJobVacancyListMobileItemModule {}
