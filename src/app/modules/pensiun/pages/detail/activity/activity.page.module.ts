import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AppCommonBreadcrumbComponentModule,
  AppCommonIconComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { AppCommonFooterContainerModule } from '@containers/common';
import { MenuPipesModule } from '@controllers/menu';
import { IonicModule } from '@ionic/angular';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { DeleteDataModalModule } from 'libs/components/ruang-pensiun/modals/delete-data/module';
import { OpenImageModalModule } from 'libs/components/ruang-pensiun/modals/open-image/module';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { SwiperModule } from 'swiper/angular';
import { DetailActivityPage } from './activity.page';

@NgModule({
  declarations: [DetailActivityPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,
    CommonAlertComponentModule,
    ProfileHeaderComponentModule,
    AppCommonFooterContainerModule,

    AppCommonBreadcrumbComponentModule,
    DeleteDataModalModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
    MenuPipesModule,
    TransformersModule,

    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
    OpenImageModalModule,

    RouterModule.forChild([
      {
        path: '',
        component: DetailActivityPage,
      },
    ]),
  ],
})
export class PensiunDetailActivityPageModule {}
