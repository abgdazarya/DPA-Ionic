import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
  AppCommonFeatureNotAvailableComponentModule,
} from '@components/common';
import { MenuPipesModule } from '@controllers/menu';
import { IonicModule } from '@ionic/angular';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { IndexFriendPage } from './friend.page';
import { AuthPipesModule } from '@controllers/auth';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { AjakPesertaModalModule } from 'libs/components/ruang-pensiun/modals/ajak-peserta/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AppRuangPensiunListWebCardModule, AppRuangPensiunListMobileCardModule } from '@components/ruang-pensiun';

@NgModule({
  declarations: [IndexFriendPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,

    AppCommonFeatureNotAvailableComponentModule,

    MenuStoreModule,
    MenuInteractionStoreModule,
    MenuPipesModule,
    AuthPipesModule,
    TransformersModule,
    AjakPesertaModalModule,
    CommonAlertComponentModule,
    
    AppRuangPensiunListWebCardModule,
    AppRuangPensiunListMobileCardModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexFriendPage,
      },
    ]),
  ],
})
export class PensiunIndexFriendPageModule {}
