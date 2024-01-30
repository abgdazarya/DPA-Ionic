import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromoSucceedModal } from './succeed.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PromoSucceedModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
  ],
  exports: [PromoSucceedModal],
})
export class PromoSucceedModalModule {}
