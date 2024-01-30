import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AstramagazineListContainer } from './astramagazine-list.container';
import {
  AppAstramagazineListWebCardModule,
  AppAstramagazineListMobileCardModule,
} from '@components/astramagazine';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import {
  MenuAstramagazineInteractionStoreModule,
  MenuAstramagazineStoreModule,
} from '@stores/menu-astramagazine';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AstramagazineListPartMobileModule } from './mobile/module';
import { AstramagazineListPartWebModule } from './web/module';

@NgModule({
  declarations: [AstramagazineListContainer],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppAstramagazineListWebCardModule,
    AppAstramagazineListMobileCardModule,
    CommonAlertComponentModule,

    MenuAstramagazineStoreModule,
    MenuAstramagazineInteractionStoreModule,

    AstramagazineListPartWebModule,
    AstramagazineListPartMobileModule,
  ],
  exports: [AstramagazineListContainer],
})
export class AppAstramagazineListContainerModule {}
