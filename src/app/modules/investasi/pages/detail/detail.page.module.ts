import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import { DetailPage } from './detail.page';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import {
  MenuLaporanInvestasiInteractionStoreModule,
  MenuLaporanInvestasiStoreModule,
} from '@stores/menu-laporan-investasi';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';

@NgModule({
  declarations: [DetailPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,

    MenuLaporanInvestasiStoreModule,
    MenuLaporanInvestasiInteractionStoreModule,
    WaFloatingButtonModule,

    RouterModule.forChild([
      {
        path: '',
        component: DetailPage,
      },
    ]),
  ],
})
export class InvestasiDetailPageModule {}
