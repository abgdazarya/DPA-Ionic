import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { AuthOtpModal } from './otp.modal';

@NgModule({
  declarations: [AuthOtpModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
    AuthStoreModule,
    AuthInteractionStoreModule,
    CommonAlertComponentModule,
    ProfileHeaderComponentModule,
    AppCommonButtonComponentModule,
    CommonAlertComponentModule,
  ],
  exports: [AuthOtpModal],
})
export class AuthOtpModalModule {}
