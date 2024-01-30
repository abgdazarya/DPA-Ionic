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
import { IndexVacancyPage } from './vacancy.page';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { AppJobVacancyListContainerModule } from '@containers/job';

@NgModule({
  declarations: [IndexVacancyPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    AppCommonIconComponentModule,

    AppCommonButtonComponentModule,

    AppJobVacancyListContainerModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexVacancyPage,
      },
    ]),
  ],
})
export class JobIndexVacancyPageModule {}
