import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DpaTvListWebCard } from './dpa-tv-list-web.card';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';

@NgModule({
  declarations: [DpaTvListWebCard],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [DpaTvListWebCard],
})
export class AppDpaTvListWebCardModule {}
