import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileRateSucceedModal } from './rate-succeed.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { ProfileHeaderComponentModule } from '../../header/header-mobile/module';

@NgModule({
  declarations: [ProfileRateSucceedModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    ProfileHeaderComponentModule,
  ],
  exports: [ProfileRateSucceedModal],
})
export class ProfileRateSucceedModalModule {}
