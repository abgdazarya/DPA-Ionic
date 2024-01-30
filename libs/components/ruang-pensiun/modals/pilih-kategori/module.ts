import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';
import { IonicModule } from '@ionic/angular';
import { PilihKategoriModal } from './pilih-kategori.modal';
// import { AppAuthUserNumberContainerModule } from '@containers/auth';

@NgModule({
  declarations: [PilihKategoriModal],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
  ],

  exports: [PilihKategoriModal],
})
export class PilihKategoriModalModule {}
