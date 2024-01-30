import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsFooterWebItem } from './news-footer-web.item';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [NewsFooterWebItem],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [NewsFooterWebItem],
})
export class AppNewsFooterWebItemModule {}
