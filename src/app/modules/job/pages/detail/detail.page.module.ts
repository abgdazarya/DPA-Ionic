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
import { IonicModule } from '@ionic/angular';
import { DetailPage } from './detail.page';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { MenuInteractionStoreModule, MenuStoreModule } from '@stores/menu';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import {
  MenuJobInteractionStoreModule,
  MenuJobStoreModule,
} from '@stores/menu-job';
import {
  AppJobDetailContainerModule,
  AppJobRecommendationListContainerModule,
} from '@containers/job';

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
    AppCommonBreadcrumbComponentModule,

    AppJobRecommendationListContainerModule,
    AppJobDetailContainerModule,

    MenuJobStoreModule,
    MenuJobInteractionStoreModule,

    ProfileHeaderComponentModule,
    WaFloatingButtonModule,

    RouterModule.forChild([
      {
        path: '',
        component: DetailPage,
      },
    ]),
  ],
})
export class JobDetailPageModule {}
