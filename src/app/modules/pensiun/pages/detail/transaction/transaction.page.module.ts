import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
  AppCommonBreadcrumbComponentModule,
} from '@components/common';
import { MenuPipesModule } from '@controllers/menu';
import { IonicModule } from '@ionic/angular';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { DetailTransactionPage } from './transaction.page';
import { SwiperModule } from 'swiper/angular';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AppCommonFooterContainerModule } from '@containers/common';
import { DeleteDataModalModule } from 'libs/components/ruang-pensiun/modals/delete-data/module';
import { CurrencyModule } from 'libs/components/common/currency-input/currency-module';
import { OpenImageModalModule } from 'libs/components/ruang-pensiun/modals/open-image/module';

@NgModule({
  declarations: [DetailTransactionPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,
    ProfileHeaderComponentModule,
    AppCommonFooterContainerModule,
    DeleteDataModalModule,
    AppCommonBreadcrumbComponentModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
    CommonAlertComponentModule,
    MenuPipesModule,
    TransformersModule,
    CurrencyModule,

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
        component: DetailTransactionPage,
      },
    ]),
  ],
})
export class PensiunDetailTransactionPageModule {}
