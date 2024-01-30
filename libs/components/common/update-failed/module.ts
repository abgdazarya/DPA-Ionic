import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppCommonIconComponentModule } from '@components/common';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { UpdateFailedModal } from './update-failed.modal';

@NgModule({
  declarations: [UpdateFailedModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    ProfileHeaderComponentModule,
  ],
  exports: [UpdateFailedModal],
})
export class UpdateFailedModalModule {}
