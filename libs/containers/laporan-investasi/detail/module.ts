import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  MenuPromotionInteractionStoreModule,
  MenuPromotionStoreModule,
} from '@stores/menu-promotion';
import { PromotionDetailContainer } from './promotion-detail.container';
import { AppCommonButtonComponentModule } from '@components/common';
import { SwiperModule } from 'swiper/angular';
import {
  AppPromotionBannerMobileCardModule,
  AppPromotionBannerWebCardModule,
} from '@components/promotion';

@NgModule({
  declarations: [PromotionDetailContainer],
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule,
    AppCommonButtonComponentModule,

    AppPromotionBannerWebCardModule,
    AppPromotionBannerMobileCardModule,

    MenuPromotionInteractionStoreModule,
    MenuPromotionStoreModule,
  ],
  exports: [PromotionDetailContainer],
})
export class AppPromotionDetailContainerModule {}
