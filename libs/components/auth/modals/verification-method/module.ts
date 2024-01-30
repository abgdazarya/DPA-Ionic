import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { AuthVerificationMethodModal } from './verification-method.modal';

@NgModule({
  declarations: [AuthVerificationMethodModal],
  imports: [
    IonicModule,
    CommonModule,
    ProfileHeaderComponentModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [AuthVerificationMethodModal],
})
export class AuthVerificationMethodModalModule {}
