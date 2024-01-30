import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsListMobileCard } from './news-list-mobile.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [NewsListMobileCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [NewsListMobileCard],
})
export class AppNewsListMobileCardModule {}
