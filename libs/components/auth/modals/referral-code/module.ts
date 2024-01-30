import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthReferralCodeModal } from './referral-code.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { AuthReferralCodeFormModule } from '../../forms/referral-code/module';

@NgModule({
  declarations: [AuthReferralCodeModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
    AuthReferralCodeFormModule,

    AuthStoreModule,
    AuthInteractionStoreModule,
  ],
  exports: [AuthReferralCodeModal],
})
export class AuthReferralCodeModalModule {}
