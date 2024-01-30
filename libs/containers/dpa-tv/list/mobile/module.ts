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
import { DpaTvListPartMobile } from './dpa-tv-list.part';

@NgModule({
  declarations: [DpaTvListPartMobile],
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
  exports: [DpaTvListPartMobile],
})
export class DpaTvListPartMobileModule {}
