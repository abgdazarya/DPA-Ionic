import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { SelectModal } from './select-modal.modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SelectModal],
})
export class SelectModalModule {}
