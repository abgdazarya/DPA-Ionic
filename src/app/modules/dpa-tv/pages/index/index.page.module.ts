import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
// import { DpaTvCardModule, DpaTvShareModalModule } from '@components/dpa-tv';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index.page';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { AppDpaTvListContainerModule } from '@containers/dpa-tv';

@NgModule({
  declarations: [IndexPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppDpaTvListContainerModule,

    // DpaTvShareModalModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexPage,
      },
    ]),
  ],
})
export class DpaTvIndexPageModule {}
