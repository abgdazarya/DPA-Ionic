import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LaporanInvestasiListWebItem } from './laporan-investasi-list-web.item';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';

@NgModule({
  declarations: [LaporanInvestasiListWebItem],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [LaporanInvestasiListWebItem],
})
export class AppLaporanInvestasiListWebItemModule {}
