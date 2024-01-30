import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonButtonComponentModule } from '@components/common';
import {
  AppDpaTvCommonMobileCardModule,
  AppDpaTvCommonWebCardModule,
} from '@components/dpa-tv';
import { IonicModule } from '@ionic/angular';
import {
  MenuDpaTvInteractionStoreModule,
  MenuDpaTvStoreModule,
} from '@stores/menu-dpa-tv';
import { SwiperModule } from 'swiper/angular';
import { DpaTvLandingContainer } from './dpa-tv-landing.container';

@NgModule({
  declarations: [DpaTvLandingContainer],
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule,

    AppCommonButtonComponentModule,
    AppDpaTvCommonWebCardModule,
    AppDpaTvCommonMobileCardModule,

    MenuDpaTvStoreModule,
    MenuDpaTvInteractionStoreModule,
  ],
  exports: [DpaTvLandingContainer],
})
export class AppDpaTvLandingContainerModule {}
