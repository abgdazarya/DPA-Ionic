import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { SelectPopup } from './select-popup.modal';
import { SelectModalModule } from './select-modal/module';

@NgModule({
  declarations: [SelectPopup],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    SelectModalModule,
  ],
  exports: [SelectPopup],
})
export class SelectPopupModule {}
