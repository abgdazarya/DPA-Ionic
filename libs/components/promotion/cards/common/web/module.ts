import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromotionCommonWebCard } from './promotion-common-web.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [PromotionCommonWebCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [PromotionCommonWebCard],
})
export class AppPromotionCommonWebCardModule {}
