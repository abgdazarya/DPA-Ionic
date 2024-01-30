import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PromoTermModal } from './term.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PromoTermModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
  ],
  exports: [PromoTermModal],
})
export class PromoTermModalModule {}
