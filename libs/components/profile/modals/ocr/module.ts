import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthUserNumberModalModule } from '@components/auth';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';
import { SelectComponent } from 'libs/components/common/select/select.component';
import { UpdateFailedModalModule } from 'libs/components/common/update-failed/module';
import { UpdateSucceedModalModule } from 'libs/components/common/update-succeed/module';
import { NumberInputDirective } from 'libs/directives/number-input.directive';
import { ProfileHeaderComponentModule } from '../../header/header-mobile/module';
import { ProfileOcrModal } from './ocr.modal';

@NgModule({
  declarations: [ProfileOcrModal],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonIconComponentModule,
    CommonAlertComponentModule,
    ProfileHeaderComponentModule,
    NumberInputDirective,
    UpdateSucceedModalModule,
    AuthUserNumberModalModule,
    SelectComponent,
    UpdateFailedModalModule,

    AuthStoreModule,
    AuthInteractionStoreModule,
  ],
  exports: [ProfileOcrModal],
})
export class ProfileOcrModalModule {}
