import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromoCard } from './promo.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [PromoCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [PromoCard],
})
export class PromoCardModule {}
