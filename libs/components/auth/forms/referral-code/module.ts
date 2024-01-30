import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthReferralCodeForm } from './auth-referral-code.form';
import {
  AppCommonButtonComponentModule,
  AppCommonIconComponentModule,
} from '@components/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthReferralCodeForm],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,

    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],
  exports: [AuthReferralCodeForm],
})
export class AuthReferralCodeFormModule {}
