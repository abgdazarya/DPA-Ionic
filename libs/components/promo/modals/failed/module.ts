import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromoFailedModal } from './failed.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PromoFailedModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
  ],
  exports: [PromoFailedModal],
})
export class PromoFailedModalModule {}
