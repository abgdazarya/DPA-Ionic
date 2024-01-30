import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { ShareMediaModal } from './share-media.modal';
import { ShareMediaListModule } from 'libs/components/common/share-media/module';
@NgModule({
  declarations: [ShareMediaModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,

    FormsModule,
    ReactiveFormsModule,
    AuthStoreModule,
    AuthInteractionStoreModule,
    ShareMediaListModule,
  ],
  exports: [ShareMediaModal],
})
export class ShareMediaModalModule {}
