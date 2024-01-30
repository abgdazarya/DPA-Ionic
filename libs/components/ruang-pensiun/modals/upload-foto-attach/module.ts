import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { ProfileHeaderComponentModule } from 'libs/components/profile/header/header-mobile/module';
import { UploadFotoAttachModal } from './upload-foto-attach.modal';

@NgModule({
  declarations: [UploadFotoAttachModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,

    FormsModule,
    ReactiveFormsModule,
    AuthStoreModule,
    AuthInteractionStoreModule,
    ProfileHeaderComponentModule,
  ],
  exports: [UploadFotoAttachModal],
})
export class UploadFotoAttachModalModule {}
