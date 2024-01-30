import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromotionBannerMobileCard } from './promotion-banner-mobile.card';
import { PromoBannerModalModule } from 'libs/components/promo/modals/banner/module';

@NgModule({
  declarations: [PromotionBannerMobileCard],
  imports: [IonicModule, CommonModule, PromoBannerModalModule],
  exports: [PromotionBannerMobileCard],
})
export class AppPromotionBannerMobileCardModule {}
