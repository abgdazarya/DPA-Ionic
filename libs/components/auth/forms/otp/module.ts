import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthOtpForm } from './auth-otp.form';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  declarations: [AuthOtpForm],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,

    CommonModule,
    AppCommonIconComponentModule,

    NgOtpInputModule,
  ],
  exports: [AuthOtpForm],
})
export class AuthOtpFormModule {}
