import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import { RuangPensiunListPartMobile } from './ruang-pensiun-list.part';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AppRuangPensiunListMobileCardModule } from 'libs/components/ruang-pensiun/cards/list/mobile/module';
import { AppRuangPensiunListWebCardModule } from 'libs/components/ruang-pensiun/cards/list/web/module';
import { MenuStoreModule, MenuInteractionStoreModule } from '@stores/menu';

@NgModule({
  declarations: [RuangPensiunListPartMobile],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppRuangPensiunListWebCardModule,
    AppRuangPensiunListMobileCardModule,
    CommonAlertComponentModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
  ],
  exports: [RuangPensiunListPartMobile],
})
export class RuangPensiunListPartMobileModule {}
