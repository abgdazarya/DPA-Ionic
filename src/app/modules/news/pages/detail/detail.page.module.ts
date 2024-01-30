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
import { IonicModule } from '@ionic/angular';
import {
  MenuNewsInteractionStoreModule,
  MenuNewsStoreModule,
} from '@stores/menu-news';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { DetailPage } from './detail.page';
import {
  AppNewsDetailContainerModule,
  AppNewsLatestContainerModule,
} from '@containers/news';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';

@NgModule({
  declarations: [DetailPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    WaFloatingButtonModule,

    AppCommonBreadcrumbComponentModule,
    AppCommonIconComponentModule,

    AppNewsDetailContainerModule,
    AppNewsLatestContainerModule,
    ProfileHeaderComponentModule,

    MenuNewsStoreModule,
    MenuNewsInteractionStoreModule,

    RouterModule.forChild([
      {
        path: '',
        component: DetailPage,
      },
    ]),
  ],
})
export class NewsDetailPageModule {}
