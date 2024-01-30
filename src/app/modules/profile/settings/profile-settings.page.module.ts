import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppCommonIconComponentModule } from '@components/common';
import { ProfileSettingsPage } from './profile-settings.page';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from 'libs/components/common/toogle/toogle.component';
import { UpdateFailedModalModule } from 'libs/components/common/update-failed/module';

@NgModule({
  declarations: [ProfileSettingsPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    AppCommonIconComponentModule,
    ToggleComponent,

    UpdateFailedModalModule,

    RouterModule.forChild([
      {
        path: '',
        component: ProfileSettingsPage,
      },
    ]),
  ],
})
export class ProfileSettingsPageModule {}
