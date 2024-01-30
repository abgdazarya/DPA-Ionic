import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AppCommonIconComponentModule,
  CommonFooterComponentModule,
  CommonHeaderComponentModule,
} from '@components/common';
import { AppAstramagazineListContainerModule } from '@containers/astramagazine';
import { IonicModule } from '@ionic/angular';
import { WaFloatingButtonModule } from 'libs/components/common/floating-button/wa-floating-button/module';
import { IndexPage } from './index.page';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { SelectComponent } from 'libs/components/common/select/select.component';
import { SelectPopupModule } from 'libs/components/common/select-popup/module';
import { MonthYearDialogComponent } from 'libs/components/common/month-year-dialog/month-year-dialog.component';
import { MenuAstramagazineRepository } from '@stores/menu-astramagazine';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { MonthYearPickerComponent } from 'libs/components/common/month-year-picker/month-year-picker.component';

@NgModule({
  declarations: [IndexPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileHeaderComponentModule,

    CommonFooterComponentModule,
    CommonHeaderComponentModule,
    WaFloatingButtonModule,
    SelectComponent,
    SelectPopupModule,
    MonthYearDialogComponent,

    AppCommonIconComponentModule,

    AppAstramagazineListContainerModule,
    MonthYearPickerComponent,
    CommonAlertComponentModule,

    RouterModule.forChild([
      {
        path: '',
        component: IndexPage,
      },
    ]),
  ],
  providers: [MenuAstramagazineRepository]
})
export class AstramagazineIndexPageModule {}
