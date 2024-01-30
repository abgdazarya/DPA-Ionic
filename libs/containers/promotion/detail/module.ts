import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  MenuPromotionInteractionStoreModule,
  MenuPromotionStoreModule,
} from '@stores/menu-promotion';
import { PromotionDetailContainer } from './promotion-detail.container';
import { AppCommonButtonComponentModule } from '@components/common';
import { SwiperModule } from 'swiper/angular';
import {
  AppPromotionBannerMobileCardModule,
  AppPromotionBannerWebCardModule,
} from '@components/promotion';
import { LoaderInfinityComponent } from 'libs/components/common/loader-infinity/loader-infinity.component';
import { ShareMediaListModule } from 'libs/components/common/share-media/module';
import { PromoFailedModal } from 'libs/components/promo/modals/failed/failed.modal';
import { PromoFailedModalModule } from 'libs/components/promo/modals/failed/module';

@NgModule({
  declarations: [PromotionDetailContainer],
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule,
    AppCommonButtonComponentModule,

    AppPromotionBannerWebCardModule,
    AppPromotionBannerMobileCardModule,

    MenuPromotionInteractionStoreModule,
    MenuPromotionStoreModule,
    LoaderInfinityComponent,
    ShareMediaListModule,
    PromoFailedModalModule,
  ],
  exports: [PromotionDetailContainer],
})
export class AppPromotionDetailContainerModule {}
