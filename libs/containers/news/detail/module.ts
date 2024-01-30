import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';
import { NewsDetailContainer } from './news-detail.container';
import { AppCommonButtonComponentModule } from '@components/common';

@NgModule({
  declarations: [NewsDetailContainer],
  imports: [IonicModule, CommonModule, AppCommonButtonComponentModule],
  exports: [NewsDetailContainer],
})
export class AppNewsDetailContainerModule {}
