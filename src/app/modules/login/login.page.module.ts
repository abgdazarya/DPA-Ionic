import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import {
  AuthPinModalModule,
  AuthUserNumberModalModule,
  AuthVerificationMethodModalModule,
  AuthReferralCodeModalModule,
  AuthOtpModalModule,
  AuthLoginFormModule,
} from '@components/auth';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import {
  ProfileInteractionStoreModule,
  ProfileStoreModule,
} from '@stores/profile';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from 'libs/components/common/text-input/text-input.component';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import {
  CommonHeaderComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
// import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { AppAuthUserNumberContainerModule } from '@containers/auth';
import { AppAuthReferralCodeContainerModule } from 'libs/containers/auth/referral-code/module';
import { AppAuthOtpContainerModule } from 'libs/containers/auth/otp/module';
import { AppAuthPinContainerModule } from 'libs/containers/auth/pin/module';
import { AppAuthVerifyMethodContainerModule } from 'libs/containers/auth/verify-method/module';
import { LoginPageService } from './login.page.service';

@NgModule({
  declarations: [LoginPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // AppCommonButtonComponentModule,
    AppAuthUserNumberContainerModule,
    AppAuthReferralCodeContainerModule,
    AppAuthOtpContainerModule,
    AppAuthPinContainerModule,
    AppAuthVerifyMethodContainerModule,

    AuthUserNumberModalModule,
    AuthVerificationMethodModalModule,
    AuthPinModalModule,
    AuthReferralCodeModalModule,
    AuthOtpModalModule,
    CommonHeaderComponentModule,

    AuthStoreModule,
    AuthInteractionStoreModule,

    ProfileStoreModule,
    ProfileInteractionStoreModule,

    AuthLoginFormModule,

    TextInputComponent,
    CommonAlertComponentModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    RouterModule.forChild([
      {
        path: '',
        component: LoginPage,
      },
    ]),
  ],
  providers: [LoginPageService],
})
export class LoginPageModule {}
