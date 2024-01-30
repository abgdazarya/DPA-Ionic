import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppCommonIconComponentModule } from '@components/common';
import { UpdateSucceedModal } from './update-succeed.modal';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';

@NgModule({
  declarations: [UpdateSucceedModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    ProfileHeaderComponentModule,
  ],
  exports: [UpdateSucceedModal],
})
export class UpdateSucceedModalModule {}
