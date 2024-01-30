import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthLoginForm } from './auth-login.form';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthLoginForm],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,

    CommonModule,
    AppCommonIconComponentModule,
  ],
  exports: [AuthLoginForm],
})
export class AuthLoginFormModule {}
