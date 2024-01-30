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
import { IndexPage } from './index.page';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { AppLaporanInvestasiListContainerModule } from '@containers/laporan-investasi';

@NgModule({
  declarations: [IndexPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,

    AppLaporanInvestasiListContainerModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
    WaFloatingButtonModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexPage,
      },
    ]),
  ],
})
export class InvestasiIndexPageModule {}
