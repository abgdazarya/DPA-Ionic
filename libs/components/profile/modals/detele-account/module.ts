import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { IonicModule } from '@ionic/angular';
import { BottomSheetComponent } from 'libs/components/common/bottom-sheet/bottom-sheet.component';
import { DeleteAccountModal } from './detele-account.modal';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';

@NgModule({
  declarations: [DeleteAccountModal],
  imports: [
    BottomSheetComponent,
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    CommonAlertComponentModule,
    AuthStoreModule,
    AuthInteractionStoreModule,
  ],
  exports: [DeleteAccountModal],
})
export class DeleteAccountModalModule {}
