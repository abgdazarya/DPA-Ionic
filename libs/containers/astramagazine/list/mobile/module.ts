import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import { AstramagazineListPartMobile } from './astramagazine-list.part';
import { AppAstramagazineListWebCardModule, AppAstramagazineListMobileCardModule } from '@components/astramagazine';
import { MenuAstramagazineStoreModule, MenuAstramagazineInteractionStoreModule } from '@stores/menu-astramagazine';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';

@NgModule({
  declarations: [AstramagazineListPartMobile],
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
  ],
  exports: [AstramagazineListPartMobile],
})
export class AstramagazineListPartMobileModule {}
