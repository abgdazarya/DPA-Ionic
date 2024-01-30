import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LaporanInvestasiListMobileItem } from './laporan-investasi-list-mobile.item';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [LaporanInvestasiListMobileItem],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [LaporanInvestasiListMobileItem],
})
export class AppLaporanInvestasiListMobileItemModule {}
