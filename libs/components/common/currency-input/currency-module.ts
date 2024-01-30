import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyInputComponent } from './currency-input.component';

@NgModule({
  declarations: [CurrencyInputComponent],
  exports: [CurrencyInputComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class CurrencyModule {}
