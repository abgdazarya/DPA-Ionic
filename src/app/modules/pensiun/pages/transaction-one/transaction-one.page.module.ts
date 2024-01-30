import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AppCommonFeatureNotAvailableComponentModule,
  AppCommonIconComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { MenuPipesModule } from '@controllers/menu';
import { IonicModule } from '@ionic/angular';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { TransactionOnePage } from './transaction-one.page';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { PensiunPageService } from '../pensiun-page.service';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { NgxMaskModule } from 'ngx-mask';
import { SuccessPostModalModule } from 'libs/components/ruang-pensiun/modals/success-post/module';
import { AppRuangPensiunListWebCardModule, AppRuangPensiunListMobileCardModule } from '@components/ruang-pensiun';

@NgModule({
  declarations: [TransactionOnePage],
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
    ProfileHeaderComponentModule,
    CommonAlertComponentModule,
    MenuPipesModule,
    TransformersModule,
    NgxMaskModule.forRoot(),
    SuccessPostModalModule,
    
    AppRuangPensiunListWebCardModule,
    AppRuangPensiunListMobileCardModule,

    RouterModule.forChild([
      {
        path: '',
        component: TransactionOnePage,
      },
    ]),
  ],
  providers: [PensiunPageService]
})
export class PensiunTransactionOnePageModule {}
