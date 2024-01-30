import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
  AppCommonFeatureNotAvailableComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './index.page';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';

@NgModule({
  declarations: [IndexPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,

    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
    AppCommonFeatureNotAvailableComponentModule,

    ProfileHeaderComponentModule,
    WaFloatingButtonModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexPage,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'vacancy',
          },

          {
            path: 'vacancy',
            loadChildren: () =>
              import('./vacancy/vacancy.page.module').then(
                (m) => m.JobIndexVacancyPageModule
              ),
          },
          {
            path: 'website',
            loadChildren: () =>
              import('./website/website.page.module').then(
                (m) => m.JobIndexWebsitePageModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class JobIndexPageModule {}
