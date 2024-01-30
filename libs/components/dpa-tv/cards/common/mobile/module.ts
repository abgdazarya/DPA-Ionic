import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DpaTvCommonMobileCard } from './dpa-tv-common-mobile.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [DpaTvCommonMobileCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [DpaTvCommonMobileCard],
})
export class AppDpaTvCommonMobileCardModule {}
