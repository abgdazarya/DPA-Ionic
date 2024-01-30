import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsLandingContainer } from './news-landing.container';
import {
  AppNewsCommonWebCardModule,
  AppNewsCommonMobileCardModule,
} from '@components/news';
import { SwiperModule } from 'swiper/angular';
import { AppCommonButtonComponentModule } from '@components/common';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';

@NgModule({
  declarations: [NewsLandingContainer],
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule,

    AppCommonButtonComponentModule,
    AppNewsCommonWebCardModule,
    AppNewsCommonMobileCardModule,

    MenuNewsStoreModule,
    MenuNewsInteractionStoreModule,
  ],
  exports: [NewsLandingContainer],
})
export class AppNewsLandingContainerModule {}
