import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsListMobileItem } from './news-list-mobile.item';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [NewsListMobileItem],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [NewsListMobileItem],
})
export class AppNewsListMobileItemModule {}
