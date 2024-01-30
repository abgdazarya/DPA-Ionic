import { NgModule } from '@angular/core';
import { AuthUserNumberModalModule } from './user-number/module';
import { AuthVerificationMethodModalModule } from './verification-method/module';
import { AuthPinModalModule } from './pin/module';
import { AuthReferralCodeModalModule } from './referral-code/module';
import { AuthOtpModalModule } from './otp/module';

const MODULES: any[] = [
  AuthUserNumberModalModule,
  AuthVerificationMethodModalModule,
  AuthPinModalModule,
  AuthReferralCodeModalModule,
  AuthOtpModalModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class AuthModalsModule {}
