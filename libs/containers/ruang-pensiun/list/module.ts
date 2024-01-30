import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RuangPensiunListContainer } from './ruang-pensiun-list.container';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { RuangPensiunListPartMobileModule } from './mobile/module';
import { AppRuangPensiunListMobileCardModule } from 'libs/components/ruang-pensiun/cards/list/mobile/module';
import { AppRuangPensiunListWebCardModule } from 'libs/components/ruang-pensiun/cards/list/web/module';
import { RuangPensiunListPartWebModule } from './web/module';
import { MenuStoreModule, MenuInteractionStoreModule } from '@stores/menu';

@NgModule({
  declarations: [RuangPensiunListContainer],
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

    RuangPensiunListPartWebModule,
    RuangPensiunListPartMobileModule,
  ],
  exports: [RuangPensiunListContainer],
})
export class AppRuangPensiunListContainerModule {}
