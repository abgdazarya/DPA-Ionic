import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { ProfileContactEmailModal } from './contact-email.modal';
import { ProfileHeaderComponentModule } from '../../header/header-mobile/module';
import { UpdateSucceedModalModule } from 'libs/components/common/update-succeed/module';

@NgModule({
  declarations: [ProfileContactEmailModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,

    FormsModule,
    ReactiveFormsModule,
    AuthStoreModule,
    AuthInteractionStoreModule,
    CommonAlertComponentModule,
    ProfileHeaderComponentModule,
    UpdateSucceedModalModule,
  ],
  exports: [ProfileContactEmailModal],
})
export class ProfileContactEmailModalModule {}
