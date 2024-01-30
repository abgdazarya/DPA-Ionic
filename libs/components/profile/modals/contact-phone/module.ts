import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { ProfileContactPhoneModal } from './contact-phone.modal';
import { ProfileHeaderComponentModule } from '../../header/header-mobile/module';
import { NumberInputDirective } from 'libs/directives/number-input.directive';
import { UpdateSucceedModalModule } from 'libs/components/common/update-succeed/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';

@NgModule({
  declarations: [ProfileContactPhoneModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    FormsModule,
    ReactiveFormsModule,
    AuthStoreModule,
    AuthInteractionStoreModule,
    ProfileHeaderComponentModule,
    NumberInputDirective,
    UpdateSucceedModalModule,
    CommonAlertComponentModule,
  ],
  exports: [ProfileContactPhoneModal],
})
export class ProfileContactPhoneModalModule {}
