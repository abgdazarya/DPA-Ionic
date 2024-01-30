import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AjakPesertaModal } from './ajak-peserta.modal';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AjakPesertaModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppCommonIconComponentModule,
  ],
  exports: [AjakPesertaModal],
})
export class AjakPesertaModalModule {}
