import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthPinModal } from './pin.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';
import { AuthPinFormModule } from '../../forms/pin/module';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';

@NgModule({
  declarations: [AuthPinModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
    AuthPinFormModule,

    AuthStoreModule,
    AuthInteractionStoreModule,
    CommonAlertComponentModule,
    ProfileHeaderComponentModule,
  ],
  exports: [AuthPinModal],
})
export class AuthPinModalModule {}
