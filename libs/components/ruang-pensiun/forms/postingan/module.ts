import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RuangPensiunPostinganForm } from './postingan.form';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputComponent } from 'libs/components/common/currency-input/currency-input.component';
import { CurrencyModule } from 'libs/components/common/currency-input/currency-module';
import { SelectComponent } from 'libs/components/common/select/select.component';
import { UploadFotoRpModalModule } from '../../modals/upload-foto-rp/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [RuangPensiunPostinganForm],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),

    CommonModule,
    AppCommonIconComponentModule,
    CurrencyModule,
    SelectComponent,
    UploadFotoRpModalModule,
    CommonAlertComponentModule
  ],
  exports: [RuangPensiunPostinganForm],
})
export class RuangPensiunPostinganFormModule {}
