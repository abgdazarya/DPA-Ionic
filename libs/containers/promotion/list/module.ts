import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromotionListContainer } from './promotion-list.container';
import {
  AppPromotionListWebCardModule,
  AppPromotionListMobileCardModule,
} from '@components/promotion';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import {
  MenuPromotionInteractionStoreModule,
  MenuPromotionStoreModule,
} from '@stores/menu-promotion';
import { PromotionListPartMobileModule } from './mobile/module';
import { PromotionListPartWebModule } from './web/module';

@NgModule({
  declarations: [PromotionListContainer],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppPromotionListWebCardModule,
    AppPromotionListMobileCardModule,

    MenuPromotionStoreModule,
    MenuPromotionInteractionStoreModule,
    PromotionListPartMobileModule,
    PromotionListPartWebModule,
  ],
  exports: [PromotionListContainer],
})
export class AppPromotionListContainerModule {}
