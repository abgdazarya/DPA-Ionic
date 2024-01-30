import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  AppDpaTvListWebCardModule,
  AppDpaTvListMobileCardModule,
} from '@components/dpa-tv';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import {
  MenuDpaTvInteractionStoreModule,
  MenuDpaTvStoreModule,
} from '@stores/menu-dpa-tv';
import { DpaTvListPartWeb } from './dpa-tv-list.part';

@NgModule({
  declarations: [DpaTvListPartWeb],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppDpaTvListWebCardModule,
    AppDpaTvListMobileCardModule,

    MenuDpaTvStoreModule,
    MenuDpaTvInteractionStoreModule,
  ],
  exports: [DpaTvListPartWeb],
})
export class DpaTvListPartWebModule {}
