import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { DetailPage } from './detail.page';
import { OpenImageModalModule } from 'libs/components/ruang-pensiun/modals/open-image/module';

@NgModule({
  declarations: [DetailPage],
  imports: [
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
        component: DetailPage,
        children: [
          {
            path: 'transaction/:idRuangPensiun',
            loadChildren: () =>
              import('./transaction/transaction.page.module').then(
                (m) => m.PensiunDetailTransactionPageModule
              ),
          },
          {
            path: 'activity/:idRuangPensiun',
            loadChildren: () =>
              import('./activity/activity.page.module').then(
                (m) => m.PensiunDetailActivityPageModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class PensiunDetailPageModule {}
