import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AppCommonIconComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { CustomerConcernModalModule } from '@components/profile';
import { AppDpaTvLandingContainerModule } from '@containers/dpa-tv';
import { AppNewsLandingContainerModule } from '@containers/news';
import { AppPromotionLandingContainerModule } from '@containers/promotion';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { HomeInteractionStoreModule, HomeStoreModule } from '@stores/home';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';
import {
  MenuPromotionInteractionStoreModule,
  MenuPromotionStoreModule,
} from '@stores/menu-promotion';
import {
  ProfileInteractionStoreModule,
  ProfileStoreModule,
} from '@stores/profile';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { QuizFloatingButtonModule } from 'libs/components/common/floating-button/quiz-floating-button/module';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { SwiperModule } from 'swiper/angular';
import { HomePage } from './home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    AppNewsLandingContainerModule,
    AppDpaTvLandingContainerModule,
    AppPromotionLandingContainerModule,

    CommonAlertComponentModule,
    CustomerConcernModalModule,

    AuthStoreModule,
    AuthInteractionStoreModule,

    ProfileStoreModule,
    ProfileInteractionStoreModule,

    MenuStoreModule,
    MenuInteractionStoreModule,

    MenuNewsStoreModule,
    MenuNewsInteractionStoreModule,

    MenuPromotionStoreModule,
    MenuPromotionInteractionStoreModule,

    HomeStoreModule,
    HomeInteractionStoreModule,
    QuizFloatingButtonModule,
    WaFloatingButtonModule,

    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
})
export class HomePageModule {}
