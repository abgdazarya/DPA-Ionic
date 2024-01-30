import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
  AppCommonFeatureNotAvailableComponentModule,
  AppCommonPaginationComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index.page';
import {
  MenuInteractionRepository,
  MenuInteractionStoreModule,
  MenuRepository,
  MenuStoreModule,
} from '@stores/menu';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { PensiunPageService } from '../pensiun-page.service';
import {
  RuangPensiunJualBeliModalModule,
  RuangPensiunPostinganModalModule,
} from '@components/ruang-pensiun';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { MenuPipesModule } from '@controllers/menu';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AuthPipesModule } from '@controllers/auth';
import { AjakPesertaModalModule } from 'libs/components/ruang-pensiun/modals/ajak-peserta/module';
import { SwiperModule } from 'swiper/angular';
import { AppRuangPensiunListContainerModule } from 'libs/containers/ruang-pensiun';

@NgModule({
  declarations: [IndexPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    
    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    RuangPensiunPostinganModalModule,
    AppCommonPaginationComponentModule,
    RuangPensiunJualBeliModalModule,

    AppCommonButtonComponentModule,

    ProfileHeaderComponentModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
    CommonAlertComponentModule,
    MenuPipesModule,
    WaFloatingButtonModule,
    TransformersModule,
    AppCommonFeatureNotAvailableComponentModule,
    AppRuangPensiunListContainerModule,
    AuthPipesModule,
    AjakPesertaModalModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexPage,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'index',
          },
          {
            path: 'activity',
            loadChildren: () =>
              import('./activity/activity.page.module').then(
                (m) => m.PensiunIndexActivityPageModule
              ),
          },
          {
            path: 'transaction',
            loadChildren: () =>
              import('./transaction/transaction.page.module').then(
                (m) => m.PensiunIndexTransactionPageModule
              ),
          },
          {
            path: 'friend',
            loadChildren: () =>
              import('./friend/friend.page.module').then(
                (m) => m.PensiunIndexFriendPageModule
              ),
          },
        ],
      },
    ]),
  ],
  providers: [MenuRepository, MenuInteractionRepository],
})
export class PensiunIndexPageModule {}
