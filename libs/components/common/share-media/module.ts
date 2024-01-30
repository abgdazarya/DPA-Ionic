import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { ShareMediaList } from './share-media-list.component';
@NgModule({
  declarations: [ShareMediaList],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,

    FormsModule,
    ReactiveFormsModule,
    AuthStoreModule,
    AuthInteractionStoreModule,
  ],
  exports: [ShareMediaList],
})
export class ShareMediaListModule {}
