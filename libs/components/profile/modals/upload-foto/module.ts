import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { ProfileHeaderComponentModule } from '../../header/header-mobile/module';
import { ProfileUploadFotoModal } from './upload-foto.modal';

@NgModule({
  declarations: [ProfileUploadFotoModal],
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
  exports: [ProfileUploadFotoModal],
})
export class ProfileUploadFotoModalModule {}
