import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IndexWebsitePage } from './website.page';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { AppJobWebCareerListContainerModule } from '@containers/job';

@NgModule({
  declarations: [IndexWebsitePage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    AppCommonButtonComponentModule,

    AppJobWebCareerListContainerModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexWebsitePage,
      },
    ]),
  ],
})
export class JobIndexWebsitePageModule {}
