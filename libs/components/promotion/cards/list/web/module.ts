import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromotionListWebCard } from './promotion-list-web.card';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';

@NgModule({
  declarations: [PromotionListWebCard],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [PromotionListWebCard],
})
export class AppPromotionListWebCardModule {}
