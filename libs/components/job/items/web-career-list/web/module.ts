import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { JobWebCareerListWebItem } from './job-web-career-list-web.item';
import {
  AppCommonButtonComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';

@NgModule({
  declarations: [JobWebCareerListWebItem],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [JobWebCareerListWebItem],
})
export class AppJobWebCareerListWebItemModule {}
