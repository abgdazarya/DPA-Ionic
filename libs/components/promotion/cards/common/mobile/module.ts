import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromotionCommonMobileCard } from './promotion-common-mobile.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [PromotionCommonMobileCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [PromotionCommonMobileCard],
})
export class AppPromotionCommonMobileCardModule {}
