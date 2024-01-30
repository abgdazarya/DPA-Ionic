import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsCommonMobileCard } from './news-common-mobile.card';
import { AppCommonIconComponentModule } from '@components/common';

@NgModule({
  declarations: [NewsCommonMobileCard],
  imports: [IonicModule, CommonModule, AppCommonIconComponentModule],
  exports: [NewsCommonMobileCard],
})
export class AppNewsCommonMobileCardModule {}
