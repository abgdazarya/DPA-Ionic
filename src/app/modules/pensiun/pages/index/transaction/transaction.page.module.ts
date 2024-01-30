import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AppCommonFeatureNotAvailableComponentModule,
  AppCommonIconComponentModule,
  AppCommonPaginationComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { MenuPipesModule } from '@controllers/menu';
import { IonicModule } from '@ionic/angular';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { IndexTransactionPage } from './transaction.page';
import { TransformersModule } from 'libs/pipes/transformers/transformers.module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AppRuangPensiunListWebCardModule, AppRuangPensiunListMobileCardModule } from '@components/ruang-pensiun';

@NgModule({
  declarations: [IndexTransactionPage],
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
    CommonAlertComponentModule,
    MenuPipesModule,
    TransformersModule,
    AppCommonPaginationComponentModule,
    
    AppRuangPensiunListWebCardModule,
    AppRuangPensiunListMobileCardModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexTransactionPage,
      },
    ]),
  ],
})
export class PensiunIndexTransactionPageModule {}
