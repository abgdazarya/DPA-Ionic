import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
  AppCommonBreadcrumbComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import { DetailPage } from './detail.page';
import {
  PromoBiodataFormModalModule,
  PromoSucceedModalModule,
  PromoTermModalModule,
} from '@components/promo';
import { SwiperModule } from 'swiper/angular';
import { PromoBannerModalModule } from 'libs/components/promo/modals/banner/module';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { ShareMediaModalModule } from 'libs/components/promo/modals/share-media/module';
import {
  MenuPromotionInteractionStoreModule,
  MenuPromotionStoreModule,
} from '@stores/menu-promotion';
import { AppPromotionDetailContainerModule } from '@containers/promotion';

@NgModule({
  declarations: [DetailPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,
    AppCommonBreadcrumbComponentModule,

    AppPromotionDetailContainerModule,

    PromoBiodataFormModalModule,
    PromoTermModalModule,
    PromoSucceedModalModule,
    PromoBannerModalModule,

    ProfileHeaderComponentModule,
    ShareMediaModalModule,

    MenuPromotionStoreModule,
    MenuPromotionInteractionStoreModule,

    AppCommonButtonComponentModule,

    RouterModule.forChild([
      {
        path: '',
        component: DetailPage,
      },
    ]),
  ],
})
export class PromotionDetailPageModule {}
