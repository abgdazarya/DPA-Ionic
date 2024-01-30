import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsListWebCard } from './news-list-web.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [NewsListWebCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [NewsListWebCard],
})
export class AppNewsListWebCardModule {}
