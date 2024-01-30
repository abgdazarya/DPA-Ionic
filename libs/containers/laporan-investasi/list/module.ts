import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LaporanInvestasiListContainer } from './laporan-investasi-list.container';
import {
  AppLaporanInvestasiListMobileItemModule,
  AppLaporanInvestasiListWebItemModule,
} from '@components/laporan-investasi';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import {
  MenuLaporanInvestasiInteractionStoreModule,
  MenuLaporanInvestasiStoreModule,
} from '@stores/menu-laporan-investasi';

@NgModule({
  declarations: [LaporanInvestasiListContainer],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppLaporanInvestasiListMobileItemModule,
    AppLaporanInvestasiListWebItemModule,

    MenuLaporanInvestasiStoreModule,
    MenuLaporanInvestasiInteractionStoreModule,
  ],
  exports: [LaporanInvestasiListContainer],
})
export class AppLaporanInvestasiListContainerModule {}
