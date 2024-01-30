import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  AppNewsListWebCardModule,
  AppNewsListMobileCardModule,
} from '@components/news';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';
import { NewsListPartWeb } from './news-list.part';

@NgModule({
  declarations: [NewsListPartWeb],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppNewsListWebCardModule,
    AppNewsListMobileCardModule,

    MenuNewsStoreModule,
    MenuNewsInteractionStoreModule,
  ],
  exports: [NewsListPartWeb],
})
export class NewsListPartWebModule {}
