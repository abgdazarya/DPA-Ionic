import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  AppPromotionCommonWebCardModule,
  AppPromotionCommonMobileCardModule,
} from '@components/promotion';
import { SwiperModule } from 'swiper/angular';
import { AppCommonButtonComponentModule } from '@components/common';
import {
  MenuPromotionInteractionStoreModule,
  MenuPromotionStoreModule,
} from '@stores/menu-promotion';
import { PromotionLandingContainer } from './laporan-investasi-landing.container';

@NgModule({
  declarations: [PromotionLandingContainer],
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule,

    AppCommonButtonComponentModule,
    AppPromotionCommonWebCardModule,
    AppPromotionCommonMobileCardModule,

    MenuPromotionStoreModule,
    MenuPromotionInteractionStoreModule,
  ],
  exports: [PromotionLandingContainer],
})
export class AppPromotionLandingContainerModule {}
