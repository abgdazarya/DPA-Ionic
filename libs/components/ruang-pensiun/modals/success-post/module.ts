import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SuccessPostModal } from './success-post.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SuccessPostModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
  ],
  exports: [SuccessPostModal],
})
export class SuccessPostModalModule {}
