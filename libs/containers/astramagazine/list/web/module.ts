import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import { AstramagazineListPartWeb } from './astramagazine-list.part';
import { AppAstramagazineListWebCardModule, AppAstramagazineListMobileCardModule } from '@components/astramagazine';
import { MenuAstramagazineStoreModule, MenuAstramagazineInteractionStoreModule } from '@stores/menu-astramagazine';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';

@NgModule({
  declarations: [AstramagazineListPartWeb],
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
  exports: [AstramagazineListPartWeb],
})
export class AstramagazineListPartWebModule {}
