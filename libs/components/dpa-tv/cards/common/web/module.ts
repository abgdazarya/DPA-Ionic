import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DpaTvCommonWebCard } from './dpa-tv-common-web.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [DpaTvCommonWebCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [DpaTvCommonWebCard],
})
export class AppDpaTvCommonWebCardModule {}
