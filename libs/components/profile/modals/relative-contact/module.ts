import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { ProfileRelativeContactModal } from './relative-contact.modal';
import { ProfileHeaderComponentModule } from '../../header/header-mobile/module';
import { NumberInputDirective } from 'libs/directives/number-input.directive';
import { UpdateSucceedModalModule } from 'libs/components/common/update-succeed/module';
import { SelectComponent } from 'libs/components/common/select/select.component';

@NgModule({
  declarations: [ProfileRelativeContactModal],
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    FormsModule,
    ReactiveFormsModule,
    CommonAlertComponentModule,
    ProfileHeaderComponentModule,
    NumberInputDirective,
    UpdateSucceedModalModule,
    SelectComponent,
  ],
  exports: [ProfileRelativeContactModal],
})
export class ProfileRelativeContactModalModule {}
