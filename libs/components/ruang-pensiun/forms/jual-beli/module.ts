import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RuangPensiunJualBeliForm } from './jual-beli.form';
import { AppCommonIconComponentModule } from '@components/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputComponent } from 'libs/components/common/currency-input/currency-input.component';
import { CurrencyModule } from 'libs/components/common/currency-input/currency-module';
import { SelectComponent } from 'libs/components/common/select/select.component';
import { UploadFotoAttachModalModule } from '../../modals/upload-foto-attach/module';
import { UploadFotoRpModalModule } from '../../modals/upload-foto-rp/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';

@NgModule({
  declarations: [RuangPensiunJualBeliForm],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,

    CommonModule,
    AppCommonIconComponentModule,
    CurrencyModule,
    SelectComponent,
    UploadFotoRpModalModule,
    UploadFotoAttachModalModule,
    CommonAlertComponentModule
  ],
  exports: [RuangPensiunJualBeliForm],
})
export class RuangPensiunJualBeliFormModule {}
