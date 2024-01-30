import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AppCommonIconComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import {
  AppNewsHighlightContainerModule,
  AppNewsListContainerModule,
} from '@containers/news';
import { IonicModule } from '@ionic/angular';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { IndexPage } from './index.page';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';

@NgModule({
  declarations: [IndexPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    WaFloatingButtonModule,

    AppCommonIconComponentModule,
    AppNewsHighlightContainerModule,
    AppNewsListContainerModule,
    ProfileHeaderComponentModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexPage,
      },
    ]),
  ],
})
export class NewsIndexPageModule {}
