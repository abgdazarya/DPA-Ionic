import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsListContainer } from './news-list.container';
import {
  AppNewsListWebCardModule,
  AppNewsListMobileCardModule,
  AppNewsListMobileItemModule,
} from '@components/news';
import {
  AppCommonButtonComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';
import { NewsListPartMobileModule } from './mobile/module';
import { NewsListPartWebModule } from './web/module';

@NgModule({
  declarations: [NewsListContainer],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonButtonComponentModule,
    AppCommonPaginationComponentModule,

    AppNewsListWebCardModule,
    AppNewsListMobileCardModule,
    AppNewsListMobileItemModule,

    MenuNewsStoreModule,
    MenuNewsInteractionStoreModule,
    NewsListPartWebModule,
    NewsListPartMobileModule,
  ],
  exports: [NewsListContainer],
})
export class AppNewsListContainerModule {}
