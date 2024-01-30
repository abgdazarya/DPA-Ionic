import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
import { PromotionListPartWeb } from './promotion-list.part';

@NgModule({
  declarations: [PromotionListPartWeb],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppPromotionListWebCardModule,
    AppPromotionListMobileCardModule,

    MenuPromotionStoreModule,
    MenuPromotionInteractionStoreModule,
  ],
  exports: [PromotionListPartWeb],
})
export class PromotionListPartWebModule {}
