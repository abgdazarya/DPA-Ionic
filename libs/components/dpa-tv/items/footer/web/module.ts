import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DpaTvFooterWebItem } from './dpa-tv-footer-web.item';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [DpaTvFooterWebItem],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [DpaTvFooterWebItem],
})
export class AppDpaTvFooterWebItemModule {}
