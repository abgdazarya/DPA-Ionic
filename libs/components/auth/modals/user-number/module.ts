import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AppCommonIconComponentModule,
  AppCommonButtonComponentModule,
} from '@components/common';
import { AuthPipesModule } from '@controllers/auth';
import { IonicModule } from '@ionic/angular';
import { AuthUserNumberModal } from './user-number.modal';
// import { AppAuthUserNumberContainerModule } from '@containers/auth';

@NgModule({
  declarations: [AuthUserNumberModal],
  imports: [
    IonicModule,
    CommonModule,

    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,

    // AppAuthUserNumberContainerModule,

    AuthPipesModule,
  ],

  exports: [AuthUserNumberModal],
})
export class AuthUserNumberModalModule {}
