import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DpaTvListContainer } from './dpa-tv-list.container';
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
import { DpaTvListPartWebModule } from './web/module';
import { DpaTvListPartMobileModule } from './mobile/module';

@NgModule({
  declarations: [DpaTvListContainer],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppDpaTvListWebCardModule,
    AppDpaTvListMobileCardModule,

    MenuDpaTvStoreModule,
    MenuDpaTvInteractionStoreModule,
    DpaTvListPartWebModule,
    DpaTvListPartMobileModule,
  ],
  exports: [DpaTvListContainer],
})
export class AppDpaTvListContainerModule {}
