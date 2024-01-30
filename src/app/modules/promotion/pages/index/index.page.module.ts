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
import { IndexPage } from './index.page';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { AppPromotionListContainerModule } from '@containers/promotion';

@NgModule({
  declarations: [IndexPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppPromotionListContainerModule,

    ProfileHeaderComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexPage,
      },
    ]),
  ],
})
export class PromotionIndexPageModule {}
