import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthPinForm } from './auth-pin.form';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  declarations: [AuthPinForm],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,

    CommonModule,
    AppCommonIconComponentModule,
  ],
  exports: [AuthPinForm],
})
export class AuthPinFormModule {}
