import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { AuthPipesModule } from '@controllers/auth';
import { IonicModule } from '@ionic/angular';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { AuthOtpContainer } from './otp.container';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { AuthOtpFormModule } from 'libs/components/auth/forms/otp/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';

@NgModule({
  declarations: [AuthOtpContainer],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
    CommonAlertComponentModule,

    AuthOtpFormModule,

    AuthStoreModule,
    AuthInteractionStoreModule,

    AuthPipesModule,
  ],
  exports: [AuthOtpContainer],
})
export class AppAuthOtpContainerModule {}
