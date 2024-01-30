import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonIconComponentModule } from '@components/common';
import { AuthPipesModule } from '@controllers/auth';
import { IonicModule } from '@ionic/angular';
import { AppCommonButtonComponentModule } from 'libs/components/common/button/module';
import { AuthPinContainer } from './pin.container';
import { AuthInteractionStoreModule, AuthStoreModule } from '@stores/auth';
import { AuthPinFormModule } from 'libs/components/auth/forms/pin/module';
import { CommonAlertComponentModule } from 'libs/components/common/alert/module';

@NgModule({
  declarations: [AuthPinContainer],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    CommonAlertComponentModule,

    AuthPinFormModule,

    AuthStoreModule,
    AuthInteractionStoreModule,

    AuthPipesModule,
  ],
  exports: [AuthPinContainer],
})
export class AppAuthPinContainerModule {}
