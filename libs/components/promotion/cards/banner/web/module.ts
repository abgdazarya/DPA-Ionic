import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromotionBannerWebCard } from './promotion-banner-web.card';
import { PromoBannerModalModule } from 'libs/components/promo/modals/banner/module';

@NgModule({
  declarations: [PromotionBannerWebCard],
  imports: [IonicModule, CommonModule, PromoBannerModalModule],
  exports: [PromotionBannerWebCard],
})
export class AppPromotionBannerWebCardModule {}
