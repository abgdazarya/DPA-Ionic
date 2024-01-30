import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { JobWebCareerListMobileItem } from './job-web-career-list-mobile.item';
import {
  AppCommonButtonComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';

@NgModule({
  declarations: [JobWebCareerListMobileItem],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [JobWebCareerListMobileItem],
})
export class AppJobWebCareerListMobileItemModule {}
