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
import { NewsListPartMobile } from './news-list.part';

@NgModule({
  declarations: [NewsListPartMobile],
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
  exports: [NewsListPartMobile],
})
export class NewsListPartMobileModule {}
