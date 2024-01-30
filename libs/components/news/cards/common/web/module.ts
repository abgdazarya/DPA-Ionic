import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsCommonWebCard } from './news-common-web.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [NewsCommonWebCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [NewsCommonWebCard],
})
export class AppNewsCommonWebCardModule {}
