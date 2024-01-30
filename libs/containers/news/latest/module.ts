import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsLatestContainer } from './news-latest.container';
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

@NgModule({
  declarations: [NewsLatestContainer],
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
  ],
  exports: [NewsLatestContainer],
})
export class AppNewsLatestContainerModule {}
