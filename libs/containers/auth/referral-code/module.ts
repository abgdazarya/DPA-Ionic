import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { AuthPipesModule } from '@controllers/auth';
import { IonicModule } from '@ionic/angular';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { AuthReferralCodeContainer } from './referral-code.container';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { AuthReferralCodeFormModule } from 'libs/components/auth/forms/referral-code/module';

@NgModule({
  declarations: [AuthReferralCodeContainer],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    AuthReferralCodeFormModule,

    AuthStoreModule,
    AuthInteractionStoreModule,

    AuthPipesModule,
  ],
  exports: [AuthReferralCodeContainer],
})
export class AppAuthReferralCodeContainerModule {}
