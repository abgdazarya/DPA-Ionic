import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromotionListMobileCard } from './promotion-list-mobile.card';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';

@NgModule({
  declarations: [PromotionListMobileCard],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [PromotionListMobileCard],
})
export class AppPromotionListMobileCardModule {}
